import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";

const api_url = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: api_url,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 3;

const processQueue = (error: unknown, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export function setupAxiosInterceptors() {
  axiosInstance.interceptors.request.use(
    (config) => {
      const state = useAuthStore.getState();
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config, response } = error;
      const originalRequest = config;

      const isAuthRequest =
        config?.url?.includes("/auth/login") ||
        config?.url?.includes("/auth/register");

      if (isAuthRequest) {
        return Promise.reject(error);
      }

      const hasToken = !!useAuthStore.getState().token;

      if (!hasToken) {
        return Promise.reject(error);
      }

      if (response?.status === 401 && !originalRequest._retry) {
        if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
          console.error("Max refresh attempts reached");
          const authStore = useAuthStore.getState();
          authStore.setLogoutReason("UNAUTHORIZED");
          authStore.clearAuth();
          refreshAttempts = 0;
          return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        isRefreshing = true;
        refreshAttempts++;
        try {
          const { data } = await axios.post(
            `${api_url}/auth/refresh`,
            {},
            { withCredentials: true }
          );

          const newAccessToken = data.data?.accessToken;

          if (!newAccessToken) {
            throw new Error("Invalid or undefined access token");
          }

          useAuthStore.getState().setToken(newAccessToken);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          processQueue(null, newAccessToken);

          refreshAttempts = 0;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);

          console.error("Token refresh failed:", refreshError);

          const authStore = useAuthStore.getState();
          authStore.setLogoutReason("UNAUTHORIZED");
          authStore.clearAuth();

          refreshAttempts = 0;

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
}
