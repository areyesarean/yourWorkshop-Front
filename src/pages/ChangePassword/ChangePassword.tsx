import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Visibility, VisibilityOff, Email, Person } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Copyright } from "../../components/Copyright";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { login } from "../../redux/slices/AuthSlice";
import { FormControlInput } from "../../components/FormControlInput";
import { useMutation } from "@tanstack/react-query";
import { ApiError, Response } from "../../types/types";
import { baseUrl } from "../../utils/constants";
import { TransitionAlerts } from "../../components/Alert";
import { SpinnerLinear } from "../../components/SpinnerLinear";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { PublicRoute } from "../../routes/paths";

const schema = yup
  .object({
    password: yup
      .string()
      .required("Debe ingresar su contraseña")
      .min(8, "La contraseña debe tener un mínimo de 8 caracteres"),
    repeatPassword: yup
      .string()
      .required("Debe ingresar su contraseña")
      .min(8, "La contraseña debe tener un mínimo de 8 caracteres")
      .oneOf(
        [yup.ref("password")],
        "La contraseña debe ser igual a la anterior"
      ),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const response = useLoaderData();
  const params = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  console.log(response);
  
  const mutation = useMutation<Response, AxiosError<ApiError>, FormData>({
    mutationFn: (data) => {
      return axios.patch(`${baseUrl}/reset-password`, {
        resetPasswordToken: params.resetPasswordToken,
        newPassword: data.repeatPassword,
      });
    },
    onSuccess: (data) => {
      //dispatch(login({ access_token: data.data.access_token }));
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    
    mutation.mutate(data);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      {mutation.isLoading && <SpinnerLinear />}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Cambiar contraseña
          </Typography>
          <Typography component="p" m={2}>
            Ingrese una nueva contraseña para su cuenta.
          </Typography>

          {mutation.isError && (
            <TransitionAlerts
              text={
                mutation.error?.response?.data?.message ??
                (mutation.error?.message === "Network Error"
                  ? "Upss! ha ocurrido un error de red"
                  : mutation.error?.message)
              }
              color="default"
              severity="error"
              open={true}
              variant="outlined"
            />
          )}

          {mutation.isSuccess && (
            <TransitionAlerts
              text="Su contraseña ha sido cambiada con éxito."
              color="success"
              severity="success"
              open={true}
              variant="outlined"
            />
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* //? INPUT PASSWORD */}
            <FormControlInput
              name="password"
              inputType={showPassword ? "text" : "password"}
              labelText="Contraseña nueva"
              register={register("password")}
              labelInput="Contraseña nueva"
              showError={errors.password !== undefined ? true : false}
              errorMessage={errors.password?.message}
            >
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            </FormControlInput>

            {/* //? INPUT PASSWORD */}
            <FormControlInput
              name="repeatPassword"
              inputType={showRepeatPassword ? "text" : "password"}
              labelText="Repita su contraseña"
              register={register("repeatPassword")}
              labelInput="Repita su contraseña"
              showError={errors.repeatPassword !== undefined ? true : false}
              errorMessage={errors.repeatPassword?.message}
            >
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle repeatPassword visibility"
                  onClick={handleClickShowRepeatPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            </FormControlInput>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cambiar contraseña
            </Button>
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Link to={`/${PublicRoute.LOGIN}`}>
                  {"Tienes una cuenta? Inicia sesión"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright mb={10} />
      </Container>
    </>
  );
};

export default ChangePassword;
