import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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

export default App;
