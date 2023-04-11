import { Payload } from "../types/types";

export const setTokenToLocalStorage = (token: string) => {
  window.localStorage.setItem("access_token", token);
};

export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem("access_token");
};

export const removeTokenFromLocalStorage = () => {
  return window.localStorage.removeItem("access_token");
};

//?VALIDAR EL TOKEN
export const getPayloadFromTokenInLocalStorage = (): Payload | null => {
  const token = window.localStorage.getItem("access_token");
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const { exp, iat, ...user } = payload;
      return user;
    } catch (error) {
      window.localStorage.removeItem("access_token");
    }
  }
  return null;
};

export const getPayloadFromToken = (token: string): Payload => {
  return JSON.parse(atob(token.split(".")[1]));
};

export const getEmailFromLocalStorage = (): string => {
  return window.localStorage.getItem("remember-email") ?? "";
};

export const setEmailFromLocalStorage = (email: string): void => {
  window.localStorage.setItem("remember-email", email);
};

export const removeEmailFromLocalStorage = (): void => {
  window.localStorage.removeItem("remember-email");
};
