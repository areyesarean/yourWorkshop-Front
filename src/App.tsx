import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SpinnerSuspense } from "./components/SpinnerSuspense";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";


function App() {
  const darkMode = useSelector((state: RootState) => state.config.darkMode);

  const darkTheme = createTheme({
    typography: {
      fontFamily: "Inconsolata",
    },
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#82AAFF",
      },
    },
  });

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
