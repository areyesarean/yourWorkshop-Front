import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { NavLink } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useTheme } from "@mui/material/styles";

interface AppLinkProps {
  to: string;
  accessRol?: string[] | string;
  title: string;
  children: React.ReactNode;
}

const AppLink = ({
  to,
  accessRol = ["USER", "ADMIN"],
  title,
  children,
}: AppLinkProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const theme = useTheme();
  let existRol;

  if (typeof accessRol === "object") {
    existRol = accessRol.find((accesRol) => accesRol === user?.rol);
  }
  if (typeof accessRol === "string") {
    existRol = accessRol === user?.rol;
  }

  if (!existRol) return null;

  return (
    <NavLink
      to={to}
      style={({ isActive, isPending }) => {
        return {
          color: isActive
            ? theme.palette.primary.main
            : theme.palette.mode === "dark"
            ? "white"
            : "black",
          textDecoration: "none",
        };
      }}
    >
      <ListItemButton>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </NavLink>
  );
};
export default AppLink;
