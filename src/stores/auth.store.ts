import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  displayName: string;
  isActive: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  logoutReason: null | "MANUAL" | "UNAUTHORIZED";
  setLogoutReason: (r: AuthState["logoutReason"]) => void;
  setAuth: (user: User, token: string) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      logoutReason: null,
      setLogoutReason: (r) => set({ logoutReason: r }),
      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          logoutReason: null,
        }),
      setToken: (token) => set({ token }),
      clearAuth: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
