import { Routes, Route, Outlet } from "react-router";
import { setupAxiosInterceptors } from "@/utils/axios";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { lazy, Suspense } from "react";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import LinearProgress from "@/components/common/LinearProgress";

const Home = lazy(() => import("@/pages/Home"));
const SignIn = lazy(() => import("@/pages/Auth/SignIn"));
const SignUp = lazy(() => import("@/pages/Auth/SignUp"));
const ResetPassword = lazy(() => import("@/pages/Auth/ResetPassword"));
const ChangePassword = lazy(() => import("@/pages/Auth/ChangePassword"));

const GameSession = lazy(() => import("@/pages/Game/Session"));

export default function MainRoutes() {
  setupAxiosInterceptors();

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AppLayout />}>
        <Route
          index
          path="/"
          element={
            <Suspense fallback={<LinearProgress loading />}>
              <Home />
            </Suspense>
          }
        />
      </Route>

      {/* Protected Game Session Routes */}
      <Route
        element={
          <ProtectedRoute>
            <main className="flex-1 min-h-screen">
              <Outlet />
            </main>
          </ProtectedRoute>
        }
      >
        <Route
          path="/play"
          element={
            <Suspense fallback={<LinearProgress loading />}>
              <GameSession />
            </Suspense>
          }
        />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route
          path="/signin"
          element={
            <Suspense fallback={<LinearProgress loading />}>
              <SignIn />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<LinearProgress loading />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="/reset-password"
          element={
            <Suspense fallback={<LinearProgress loading />}>
              <ResetPassword />
            </Suspense>
          }
        />
        <Route
          path="/change-password"
          element={
            <Suspense fallback={<LinearProgress loading />}>
              <ChangePassword />
            </Suspense>
          }
        />
      </Route>

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
