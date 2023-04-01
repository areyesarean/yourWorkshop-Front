import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoute } from "../paths";

const AuthGuard = () => {
  const {username, rol} = useSelector((state: RootState) => state.auth);
  console.log("🚀 ~ file: AuthGuard.tsx:8 ~ AuthGuard ~ rol:", rol)
  
  if (!username) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default AuthGuard;
