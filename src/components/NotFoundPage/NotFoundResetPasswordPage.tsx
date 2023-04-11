import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AxiosError } from "axios";
import { useRouteError } from "react-router-dom";
import { ApiError } from "../../types/types";

const NotFoundResetPasswordPage = () => {
  const error = useRouteError() as AxiosError<ApiError>
  console.log(error);
  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography component="h3" variant="h3">
        {error.response?.data?.message ?? "Ha ocurrido un error"}
      </Typography>
    </Box>
  );
};
export default NotFoundResetPasswordPage;
