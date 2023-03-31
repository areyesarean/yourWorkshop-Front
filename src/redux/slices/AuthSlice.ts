import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: string;
}

const initialState: AuthState = {
  user: window.localStorage.getItem("user") || "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      window.localStorage.setItem("user", action.payload);
    },
    logout: (state) => {
      state.user = "";
      window.localStorage.removeItem("user");
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = AuthSlice.actions;

export default AuthSlice;
