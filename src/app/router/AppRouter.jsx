import { Routes, Route } from "react-router";
import ROUTES from "./routes";
import { Home, Link, Auth, Dashboard, RedirectLink } from "@/pages";
import { AppLayout } from "../layout/app-layout";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LINK} element={<Link />} />
        <Route path={ROUTES.AUTH} element={<Auth />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.REDIRECTLINK} element={<RedirectLink />} />
      </Route>
    </Routes>
  );
};
