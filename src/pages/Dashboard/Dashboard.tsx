import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import AppBarCustom from "../../components/AppBar/AppBar";
import { MainMenu } from "../../components/MainMenu";

function DashboardContent() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen((open) => !open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarCustom toggleDrawer={toggleDrawer} open={open} />
      <MainMenu toggleDrawer={toggleDrawer} open={open} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
