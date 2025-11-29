import { Routes, Route } from "react-router";
import ROUTES from "./routes";
import { Home, Link, Auth, Dashboard, RedirectLink } from "@/pages";
import { AppLayout } from "../layout/app-layout";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.AUTH} element={<Auth />} />
        <Route path={ROUTES.LINK} element={
            <ProtectedRoute>
              <Link />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.DASHBOARD} element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.REDIRECTLINK} element={
            <ProtectedRoute>
              <RedirectLink />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};
