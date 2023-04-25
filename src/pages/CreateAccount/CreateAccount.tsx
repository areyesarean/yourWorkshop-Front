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
import { FormControlInput } from "../../components/FormControlInput";
import { useMutation } from "@tanstack/react-query";
import { ApiError, Response } from "../../types/types";
import { baseUrl } from "../../utils/constants";
import { TransitionAlerts } from "../../components/Alert";
import { SpinnerLinear } from "../../components/SpinnerLinear";
import { Link } from "react-router-dom";
import { PublicRoute } from "../../routes/paths";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Debe especificar un correo electrónico")
      .matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/, {
        message: "Debe especificar un correo electrónico válido",
      }),
    name: yup.string().required("Debe especificar un nombre para su cuenta"),
    lastName: yup.string().required("Debe ingresar sus apellidos"),
    password: yup
      .string()
      .required("Debe ingresar su contraseña")
      .min(8, "La contraseña debe tener un mínimo de 8 caracteres"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation<Response, AxiosError<ApiError>, FormData>({
    mutationFn: (createAccountData) => {
      return axios.post(`${baseUrl}/user`, {
        ...createAccountData,
        rol: "USER",
      });
    },
    onSuccess: (data) => {
      //dispatch(login({ access_token: data.data.access_token }));
    },
  });

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
            Crear cuenta
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
              text="Su cuenta ha sido creada con éxito.
              Hemos enviado un correo con un enlace para que pueda activarla. Por favor revise su correo electrónico"
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
            {/* //? INPUT EMAIL */}
            <FormControlInput
              name="email"
              inputType="email"
              labelText="Correo electrónico"
              autoFocus={true}
              register={register("email")}
              labelInput="Correo electrónico"
              showError={errors.email !== undefined ? true : false}
              errorMessage={errors.email?.message}
            >
              <InputAdornment position="end">
                <IconButton onMouseDown={handleMouseDownPassword} edge="end">
                  <Email aria-disabled />
                </IconButton>
              </InputAdornment>
            </FormControlInput>

            {/* //? INPUT NAME */}
            <FormControlInput
              name="name"
              inputType="name"
              labelText="Nombre"
              register={register("name")}
              labelInput="Nombre"
              showError={errors.name !== undefined ? true : false}
              errorMessage={errors.name?.message}
            >
              <InputAdornment position="end">
                <IconButton onMouseDown={handleMouseDownPassword} edge="end">
                  <Person aria-disabled />
                </IconButton>
              </InputAdornment>
            </FormControlInput>

            {/* //? INPUT LAST-NAME */}
            <FormControlInput
              name="lastName"
              inputType="lastName"
              labelText="Apellidos"
              register={register("lastName")}
              labelInput="Apellidos"
              showError={errors.lastName !== undefined ? true : false}
              errorMessage={errors.lastName?.message}
            >
              <InputAdornment position="end">
                <IconButton onMouseDown={handleMouseDownPassword} edge="end">
                  <Person aria-disabled />
                </IconButton>
              </InputAdornment>
            </FormControlInput>

            {/* //? INPUT PASSWORD */}
            <FormControlInput
              name="password"
              inputType={showPassword ? "text" : "password"}
              labelText="Contraseña"
              register={register("password")}
              labelInput="Contraseña"
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Crear cuenta
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

export default CreateAccount;
