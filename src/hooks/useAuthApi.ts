import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authApi } from '@/api/authApi';
import { useAuthStore } from '@/stores/auth';
import { AxiosError } from 'axios';
import { toastAlert } from '@/components/ui/alert/ToastAlert';

export const useSignIn = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      toastAlert({
        variant: "success",
        title: "Sign In Success",
        message: `Welcome back ${data.user.displayName} to Anivoy.`,
      });
      navigate('/');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastAlert({
        variant: "error",
        title: "Sign In Error",
        message: error.response?.data?.message || error.message,
      })
      console.error('Sign in failed:', error.response?.data?.message || error.message);
    },
  });
};

export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (data) => {
      toastAlert({
        variant: "success",
        title: "Sign Up Success",
        message: `Account has been created, sign in now.`,
      });
      navigate(`/signin?email=${data.email}`);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastAlert({
        variant: "error",
        title: "Sign Up Error",
        message: error.response?.data?.message || error.message,
      })
      console.error('Sign up failed:', error.response?.data?.message || error.message);
    },
  });
};

export const useSignOut = () => {
  const navigate = useNavigate();
  const { setLogoutReason, clearAuth } = useAuthStore.getState();

  return useMutation({
    mutationFn: authApi.signOut,
    onSuccess: () => {
      setLogoutReason("manual");
      navigate('/signin');
      clearAuth();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error('Sign out failed:', error.response?.data?.message || error.message);
      setLogoutReason("manual");
      clearAuth();
      navigate('/signin');
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      toastAlert({
        variant: "success",
        title: "Reset Password Request Success",
        message: `Reset poassword request has been sent, please check your email.`,
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastAlert({
        variant: "error",
        title: "Reset Password Request Error",
        message: error.response?.data?.message || error.message,
      })
      console.error('Reset password request failed:', error.response?.data?.message || error.message);
    }
  })
}

export const useChangePassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: () => {
      toastAlert({
        variant: "success",
        title: "Change Password Success",
        message: `Your account password has been changed, sign in now.`,
      });
      navigate(`/signin`);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastAlert({
        variant: "error",
        title: "Change Password Error",
        message: error.response?.data?.message || error.message,
      })
      console.error('Change password failed:', error.response?.data?.message || error.message);
    },
  });
}