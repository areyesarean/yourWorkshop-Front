import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
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
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation<Response, AxiosError<ApiError>, FormData>({
    mutationFn: (loginData) => {
      return axios.post(`${baseUrl}/login`, loginData);
    },
    onSuccess: (data) => {
      console.log(data.data.access_token);
      dispatch(login({ username: "areyesarean", rol: "ADMIN" }));
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
          Sign in
        </Typography>

        {mutation.isLoading && (
          <Typography component="h1" variant="h5">
            Verificando sus credenciales...
          </Typography>
        )}

        {mutation.isError && (
          <Typography component="h6" variant="h6" color="#EF5350">
            {mutation.error?.response?.data?.message}
          </Typography>
        )}

        {mutation.status === "error" && (
          <Typography component="h6" variant="h6" color="#EF5350">
            {mutation.error?.message === "Network Error" &&
              "Upss! ha ocurrido un error de red"}
          </Typography>
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
            labelText="Email"
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
            labelText="Password"
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
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
};

export default Login;
