import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoute } from "../paths";

const AuthGuard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) {
    return <Navigate to={PublicRoute.LOGIN} />;
  }
  return <Outlet />;
};

export default AuthGuard;
