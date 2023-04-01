// import { useDispatch, useSelector } from "react-redux";
// import { login, logout } from "../../redux/slices/AuthSlice";
// import { RootState } from "../../redux/store";

// const Login = () => {
//   const user = useSelector((state: RootState) => state.auth);
//   const dispatch = useDispatch();

//   const loginUser = () => {
//     dispatch(login({ username: "areyesarean", rol: "USER" }));
//   };
//   const loginAdmin = () => {
//     dispatch(login({ username: "areyesarean", rol: "ADMIN" }));
//   };

//   const logoutUser = () => {
//     dispatch(logout());
//   };

//   return (
//     <main>
//       <h3>Login asdasd asdasd</h3>
//       {user.username ? (
//         <button onClick={logoutUser}>Logout</button>
//       ) : (
//         <>
//           <button onClick={loginAdmin}>Login ADMIN</button>
//           <button onClick={loginUser}>Login USER</button>
//         </>
//       )}
//     </main>
//   );
// };
// export default Login;
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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Copyright } from "../../components/Copyright";
import FormHelperText from "@mui/material/FormHelperText";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/AuthSlice";

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

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data)
    dispatch(login({ username: "areyesarean", rol: "USER" }));
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
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <FormControl
            error={errors.email !== undefined ? true : false}
            variant="outlined"
            fullWidth
            margin="normal"
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              type="text"
              {...register("email")}
              label="Email"
              autoComplete="email"
              autoFocus
              aria-describedby="component-error-text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onMouseDown={handleMouseDownPassword} edge="end">
                    <Email aria-disabled />
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="component-error-text">
              {errors.email?.message}
            </FormHelperText>
          </FormControl>

          <FormControl
            error={errors.password !== undefined ? true : false}
            variant="outlined"
            fullWidth
            margin="normal"
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              endAdornment={
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
              }
              label="Password"
            />
            <FormHelperText id="component-error-text">
              {errors.password?.message}
            </FormHelperText>
          </FormControl>

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
}
