import CircularProgress from "@mui/material/CircularProgress";
import "./styles/index.css";
import Box from "@mui/material/Box";

const SpinnerSuspense = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100vh'
      }}
    >
      <CircularProgress color="primary" size={150} />
    </Box>
  );
};
export default SpinnerSuspense;
