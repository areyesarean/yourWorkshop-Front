import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/slices/AuthSlice";
import { RootState } from "../../redux/store";

const Login = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const loginUser = () => {
    dispatch(login("areyesarean"));
  };
  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <main>
      <h3>Login</h3>
      {user ? (
        <button onClick={logoutUser}>Logout</button>
      ) : (
        <button onClick={loginUser}>Login</button>
      )}
    </main>
  );
};
export default Login;
