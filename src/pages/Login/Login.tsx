import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Copyright } from "../../components/Copyright";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios, { AxiosError } from "axios";
import { login } from "../../redux/slices/AuthSlice";
import { FormControlInput } from "../../components/FormControlInput";
import { useMutation } from "@tanstack/react-query";
import { ApiError, Response } from "../../types/types";
import { baseUrl } from "../../utils/constants";
import { TransitionAlerts } from "../../components/Alert";
import { SpinnerLinear } from "../../components/SpinnerLinear";
import { Link } from "react-router-dom";
import { PublicRoute } from "../../routes/paths";
import {
  getEmailFromLocalStorage,
  removeEmailFromLocalStorage,
  setEmailFromLocalStorage,
} from "../../services/localStorageService";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Debe especificar un correo electrónico")
      .matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/, {
        message: "Debe especificar un correo electrónico válido",
      }),
    password: yup
      .string()
      .required("Debe ingresar su contraseña")
      .min(8, "La contraseña debe tener un mínimo de 8 caracteres"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const [remember, setRemember] = useState<boolean>(
    () => getEmailFromLocalStorage() !== ""
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [cause, _] = useState<string | null>(() =>
    new URL(`${window.document.location}`).searchParams.get("cause")
  );

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: getEmailFromLocalStorage(),
    },
  });

  const mutation = useMutation<Response, AxiosError<ApiError>, FormData>({
    mutationFn: (loginData) => {
      return axios.post(`${baseUrl}/login`, loginData);
    },
    onSuccess: (data, { email }) => {
      if (remember) {
        setEmailFromLocalStorage(email);
      }
      dispatch(login({ access_token: data.data.access_token }));
    },
  });

  const handleRemember = () => {
    setRemember((remember) => {
      if (!remember === false) {
        removeEmailFromLocalStorage();
      }
      return !remember;
    });
  };

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
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
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>

          {cause === "activate-account" && (
            <TransitionAlerts
              text="Su cuenta ha sido activada con éxito. Ya puede iniciar sesión"
              color="success"
              severity="success"
              open={true}
              variant="outlined"
            />
          )}

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

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <FormControlInput
              name="email"
              inputType="email"
              labelText="Correo"
              autoFocus={true}
              register={register("email")}
              labelInput="email"
              showError={errors.email !== undefined ? true : false}
              errorMessage={errors.email?.message}
            >
              <InputAdornment position="end">
                <IconButton onMouseDown={handleMouseDownPassword} edge="end">
                  <Email aria-disabled />
                </IconButton>
              </InputAdornment>
            </FormControlInput>

            <FormControlInput
              name="password"
              inputType={showPassword ? "text" : "password"}
              labelText="Contraseña"
              register={register("password")}
              labelInput="password"
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

            <FormControlLabel
              control={
                <Checkbox
                  checked={remember}
                  color="primary"
                  onChange={handleRemember}
                />
              }
              label="Recordarme"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Acceder
            </Button>
            <Grid container>
              <Grid item xs={12} md={6} lg={6} sm={6}>
                <Link to={`/${PublicRoute.FORGOT_PASSWORD}`}>
                  Olvidó su contraseña?
                </Link>
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={6}>
                <Link to={`/${PublicRoute.CREATE_ACCOUNT}`}>
                  {"No tienes cuenta? Crea una"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </>
  );
};

export default Login;
