import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { NotFoundPage } from "../components/NotFoundPage";
import { PrivateRoute, PublicRoute } from "./paths";
import AuthGuard from "./guards/AuthGuard";

// You can do this:
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFoundPage />}>
      <Route path="/" element={<Navigate to={PrivateRoute.DASHBOARD} />} />
      <Route path={PublicRoute.LOGIN} element={<Login />} />
      <Route element={<AuthGuard />}>
        <Route path={PrivateRoute.DASHBOARD} element={<Dashboard />} />
      </Route>
    </Route>
  )
);
