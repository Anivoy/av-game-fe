import { axiosInstance } from "@/utils/axios";
import type {
  ChangePasswordFormData,
  ResetPasswordFormData,
  SignInFormData,
  SignUpFormData,
} from "@/schemas/authSchema";

interface SignInResponse {
  user: {
    id: string;
    email: string;
    displayName: string;
    isActive: boolean;
  };
  accessToken: string;
}

interface SignUpResponse {
  id: string;
  email: string;
  displayName: string;
}

export const authApi = {
  signIn: async (data: SignInFormData): Promise<SignInResponse> => {
    const response = await axiosInstance.post("/auth/login", data, {
      withCredentials: true,
    });
    return response.data.data;
  },

  signUp: async (data: SignUpFormData): Promise<SignUpResponse> => {
    const { confirmPassword, ...signUpData } = data;
    const response = await axiosInstance.post("/auth/register", signUpData, {
      withCredentials: true,
    });
    return response.data.data;
  },

  signOut: async (): Promise<void> => {
    await axiosInstance.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
  },

  resetPassword: async (data: ResetPasswordFormData): Promise<void> => {
    await axiosInstance.post("/auth/reset-password/request", data);
  },

  changePassword: async (data: ChangePasswordFormData): Promise<void> => {
    const { confirmPassword, ...changePasswordData } = data;
    await axiosInstance.post(
      "/auth/reset-password/confirm",
      changePasswordData
    );
  },
};
