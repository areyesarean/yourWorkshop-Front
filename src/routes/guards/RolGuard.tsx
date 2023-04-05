import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoute } from "../paths";

interface RolGuardProp {
  rol: string;
}

const RolGuard = ({ rol }: RolGuardProp) => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (user?.rol === rol) {
    return <Outlet />;
  }
  return <Navigate to={`${user?.rol.toLowerCase()}`} />;
};

export default RolGuard;
