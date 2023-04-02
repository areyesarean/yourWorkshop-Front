import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Suspense } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <Suspense fallback={<h1>Cargando</h1>}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Suspense>
  );
}
1;

export default App;
