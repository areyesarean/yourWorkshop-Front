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
import RolGuard from "./guards/RolGuard";
import { Users } from "../pages/Users";
import { Admin } from "../pages/Admin";
import PublicGuard from "./guards/PublicGuard";
import { UserList } from "../components/UserList";

// You can do this:
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFoundPage />}>
      {/* PUBLIC ROUTES */}
      <Route path={PublicRoute.PUBLIC} element={<PublicGuard />}>
        <Route index element={<Navigate to={PublicRoute.LOGIN} />} />
        <Route path={PublicRoute.LOGIN} element={<Login />} />
      </Route>

      {/* PRIVATE ROUTES */}
      <Route path={PrivateRoute.PRIVATE} element={<AuthGuard />}>
        <Route index element={<Navigate to={PrivateRoute.DASHBOARD} />} />
        <Route path={PrivateRoute.DASHBOARD} element={<Dashboard />}>
          {/* ROL ADMIN */}
          <Route element={<RolGuard rol="ADMIN" />}>
            <Route index element={<Navigate to={PrivateRoute.ADMIN} />} />
            <Route path={PrivateRoute.ADMIN} element={<Admin />} />
            <Route path={PrivateRoute.USERLIST} element={<UserList />} />
          </Route>
          {/* ROL USER */}
          <Route element={<RolGuard rol="USER" />}>
            <Route index element={<Navigate to={PrivateRoute.USER} />} />
            <Route path={PrivateRoute.USER} element={<Users />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

export const routeres = createBrowserRouter([
  {
    errorElement: <NotFoundPage />,
    children: [
      {
        path: PublicRoute.PUBLIC,
        element: <PublicGuard />,
        children: [
          {
            index: true,
            element: <Navigate to={PublicRoute.LOGIN} />,
          },
          {
            path: PublicRoute.LOGIN,
            element: <Login />,
          },
        ],
      },
      {
        path: PrivateRoute.PRIVATE,
        element: <AuthGuard />,
        children: [
          {
            index: true,
            element: <Navigate to={PrivateRoute.DASHBOARD} />,
          },
          {
            path: PrivateRoute.DASHBOARD,
            element: <Dashboard />,
            children: [
              {
                element: <RolGuard rol="ADMIN" />,
                children: [
                  {
                    index: true,
                    element: <Navigate to={PrivateRoute.ADMIN} />,
                  },
                  {
                    path: PrivateRoute.ADMIN,
                    element: <Admin />,
                  },
                  {
                    path: PrivateRoute.USERLIST,
                    element: <UserList />,
                  },
                ],
              },
              {
                element: <RolGuard rol="USER" />,
                children: [
                  {
                    index: true,
                    path: PrivateRoute.USER,
                  },
                  {
                    path: PrivateRoute.USER,
                    element: <Users />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
