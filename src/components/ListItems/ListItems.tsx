import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { PrivateRoute } from "../../routes/paths";
import { AppLink } from "../AppLink";

export const mainListItems = (
  <>
    <AppLink to={PrivateRoute.ADMIN} title="Dashboard">
      <DashboardIcon />
    </AppLink>
    <AppLink to={PrivateRoute.USER_LIST} accessRol="ADMIN" title="Usuarios">
      <PeopleIcon />
    </AppLink>
    <AppLink to="clientes" title="Ventas">
      <ShoppingCartIcon />
    </AppLink>
    <AppLink to="reportes" title="Reportes">
      <BarChartIcon />
    </AppLink>
    <AppLink to="equipos" title="Equipos">
      <LayersIcon />
    </AppLink>
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Reportes
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Mes Actual" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Ultimos 4" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </>
);
