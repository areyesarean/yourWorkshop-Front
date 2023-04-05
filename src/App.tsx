import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SpinnerSuspense } from "./components/SpinnerSuspense";

const darkTheme = createTheme({
  typography: {
    fontFamily: "Lilex",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#5DFDCB",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Suspense fallback={<SpinnerSuspense />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
