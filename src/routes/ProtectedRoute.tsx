import { useAuthStore } from "@/stores/auth";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, logoutReason, setLogoutReason } = useAuthStore();

  if (!isAuthenticated) {
    if (!logoutReason) {
      setLogoutReason("unauthorized");
    }
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};
