import { createSlice } from "@reduxjs/toolkit";
import {
  getDarkModeFromLocalStorage,
  removeDarkModeFromLocalStorage,
  setDarkModeFromLocalStorage,
} from "../../services/localStorageService";

export interface ConfigState {
  darkMode: boolean;
}

const initialState: ConfigState = {
  darkMode: getDarkModeFromLocalStorage(),
};

export const ConfigSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      state.darkMode = true;
      setDarkModeFromLocalStorage("true");
    },
    setLightMode: (state) => {
      removeDarkModeFromLocalStorage();
      state.darkMode = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDarkMode,setLightMode } = ConfigSlice.actions;

export default ConfigSlice;
