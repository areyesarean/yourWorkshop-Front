import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoute } from "../paths";

interface RolGuardProp {
  rol: string;
}

const RolGuard = ({ rol }: RolGuardProp) => {
  const { rol: userRols } = useSelector((state: RootState) => state.auth);
  if (userRols === rol) {
    return <Outlet />;
  }
  return <Navigate to={`${userRols.toLowerCase()}`} />;
};

export default RolGuard;
