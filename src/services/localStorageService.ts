import { Payload } from "../types/types";

export const setTokenToLocalStorage = (token: string) => {
  window.localStorage.setItem("access_token", token);
};

export const getTokenToLocalStorage = () => {
  return window.localStorage.getItem("access_token");
};

export const getPayloadFromTokenInLocalStorage = (): Payload | null => {
  const token = window.localStorage.getItem("access_token");
  if (token) {
    return JSON.parse(atob(token.split(".")[1]));
  }
  return null;
};
