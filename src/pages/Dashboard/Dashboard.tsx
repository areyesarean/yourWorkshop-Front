import { NavLink, Outlet } from "react-router-dom";
import { PrivateRoute } from "../../routes/paths";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <NavLink
          to={PrivateRoute.USER_LIST}
          style={({ isActive }) => ({
            color: isActive ? "red" : "blue",
          })}
        >
          Listado de usuarios
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
