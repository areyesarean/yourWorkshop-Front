import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./paths";
import AuthGuard from "./guards/AuthGuard";
import RolGuard from "./guards/RolGuard";
import PublicGuard from "./guards/PublicGuard";
import { NotFoundPage } from "../components/NotFoundPage";
import { ForgotPassword } from "../pages/ForgotPassword";
import { CreateAccount } from "../pages/CreateAccount";
import { ChangePassword } from "../pages/ChangePassword";

const Login = lazy(() => import("../pages/Login/Login"))
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"))
const Admin = lazy(() => import("../pages/Admin/Admin"))
const User = lazy(() => import("../pages/Users/Users"))
const UserList = lazy(() => import("../components/UserList/UserList"))

// You can do this:
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFoundPage />}>
      {/* PUBLIC ROUTES */}
      <Route path={PublicRoute.PUBLIC} element={<PublicGuard />}>
        <Route index element={<Navigate to={PublicRoute.LOGIN} />} />
        <Route path={PublicRoute.LOGIN} element={<Login />} />
        <Route path={PublicRoute.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={PublicRoute.CREATE_ACCOUNT} element={<CreateAccount />} />
        <Route path={PublicRoute.CHANGE_PASSWORD_BY_FORGOT_PASS} element={<ChangePassword />} />
      </Route>

      {/* PRIVATE ROUTES */}
      <Route path={PrivateRoute.PRIVATE} element={<AuthGuard />}>
        <Route index element={<Navigate to={PrivateRoute.DASHBOARD} />} />
        <Route path={PrivateRoute.DASHBOARD} element={<Dashboard />}>
          {/* ROL ADMIN */}
          <Route element={<RolGuard rol="ADMIN" />}>
            <Route index element={<Navigate to={PrivateRoute.ADMIN} />} />
            <Route path={PrivateRoute.ADMIN} element={<Admin />} />
            <Route path={PrivateRoute.USER_LIST} element={<UserList />} />
          </Route>
          {/* ROL USER */}
          <Route element={<RolGuard rol="USER" />}>
            <Route index element={<Navigate to={PrivateRoute.USER} />} />
            <Route path={PrivateRoute.USER} element={<User />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

// export const routeres = createBrowserRouter([
//   {
//     errorElement: <NotFoundPage />,
//     children: [
//       {
//         path: PublicRoute.PUBLIC,
//         element: <PublicGuard />,
//         children: [
//           {
//             index: true,
//             element: <Navigate to={PublicRoute.LOGIN} />,
//           },
//           {
//             path: PublicRoute.LOGIN,
//             element: <Login />,
//           },
//         ],
//       },
//       {
//         path: PrivateRoute.PRIVATE,
//         element: <AuthGuard />,
//         children: [
//           {
//             index: true,
//             element: <Navigate to={PrivateRoute.DASHBOARD} />,
//           },
//           {
//             path: PrivateRoute.DASHBOARD,
//             element: <Dashboard />,
//             children: [
//               {
//                 element: <RolGuard rol="ADMIN" />,
//                 children: [
//                   {
//                     index: true,
//                     element: <Navigate to={PrivateRoute.ADMIN} />,
//                   },
//                   {
//                     path: PrivateRoute.ADMIN,
//                     element: <Admin />,
//                   },
//                   {
//                     path: PrivateRoute.USER_LIST,
//                     element: <UserList />,
//                   },
//                 ],
//               },
//               {
//                 element: <RolGuard rol="USER" />,
//                 children: [
//                   {
//                     index: true,
//                     path: PrivateRoute.USER,
//                   },
//                   {
//                     path: PrivateRoute.USER,
//                     element: <Users />,
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ]);
