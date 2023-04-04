import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";

const PublicGuard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user && user.active) {
    return (
      <Navigate replace to={`/private/dashboard/${user.rol.toLowerCase()}`} />
    );
  }
  return <Outlet />;
};

export default PublicGuard;
