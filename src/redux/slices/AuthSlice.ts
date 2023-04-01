import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  username: string;
  rol: string
}

const initialState: AuthState = {
  username: window.localStorage.getItem("username") || "",
  rol: window.localStorage.getItem("rol") || "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action);
      
      state.username = action.payload.username;
      state.rol = action.payload.rol;
      window.localStorage.setItem("username", action.payload.username);
      window.localStorage.setItem("rol",  action.payload.rol);
    },
    logout: (state) => {
      state = {username: "", rol: ""}
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("rol");
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = AuthSlice.actions;

export default AuthSlice;
