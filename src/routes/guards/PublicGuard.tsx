import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";

const PublicGuard = () => {
  const {username, rol} = useSelector((state: RootState) => state.auth);

  if (username) {
    return <Navigate replace to={`/private/dashboard/${rol.toLowerCase()}`} />;
  }
  return <Outlet />;
};

export default PublicGuard;
