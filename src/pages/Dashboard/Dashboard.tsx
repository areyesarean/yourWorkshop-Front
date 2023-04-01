import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <NavLink
        to={`/private/dashboard/userlist`}
        style={({ isActive, isPending }) => ({
          fontWeight: isActive ? "bold" : "",
          color: isActive ? "red" : "blue"
        })}
      >
        USER LIST
      </NavLink>
      <Outlet />
    </div>
  );
};
export default Dashboard;
