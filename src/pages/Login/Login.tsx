import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/slices/AuthSlice";
import { RootState } from "../../redux/store";

const Login = () => {
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const loginUser = () => {
    dispatch(login({ username: "areyesarean", rol: "USER" }));
  };
  const loginAdmin = () => {
    dispatch(login({ username: "areyesarean", rol: "ADMIN" }));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <main>
      <h3>Login</h3>
      {user.username ? (
        <button onClick={logoutUser}>Logout</button>
      ) : (
        <>
          <button onClick={loginAdmin}>Login ADMIN</button>
          <button onClick={loginUser}>Login USER</button>
        </>
      )}
    </main>
  );
};
export default Login;
