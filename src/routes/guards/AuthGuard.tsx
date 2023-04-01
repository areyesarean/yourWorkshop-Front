import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoute } from "../paths";

const AuthGuard = () => {
  const {username, rol} = useSelector((state: RootState) => state.auth);
  
  if (!username) {
    return <Navigate to={PublicRoute.PUBLIC} />;
  }
  return <Outlet />;
};

export default AuthGuard;
