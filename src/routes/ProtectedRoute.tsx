import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, logoutReason, setLogoutReason } = useAuthStore();

  if (!isAuthenticated) {
    if (!logoutReason) {
      setLogoutReason("UNAUTHORIZED");
    }
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};
