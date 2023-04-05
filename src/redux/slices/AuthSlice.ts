import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/types";
import {
  getPayloadFromTokenInLocalStorage,
  removeTokenFromLocalStorage,
  setTokenToLocalStorage,
} from "../../services/localStorageService";

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: getPayloadFromTokenInLocalStorage(),
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { access_token } = action.payload;
      setTokenToLocalStorage(access_token);
      state.user = getPayloadFromTokenInLocalStorage();
    },
    logout: (state) => {
      removeTokenFromLocalStorage();
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = AuthSlice.actions;

export default AuthSlice;
