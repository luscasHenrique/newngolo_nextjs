// src/services/api.ts
import axios, { AxiosError, AxiosHeaders } from "axios";
import { notify } from "@/lib/notify";
import { getItem, getBoolean, removeItem } from "@/helpers/localStorage";
import { env } from "@/config/env";

const baseUrl = env.BASE_URL;
const prefixBaseUrl = env.API_PREFIX;
const appAuth = env.AUTH_KEY;
const appUser = env.USER_KEY;

export type AxiosErrorResponse = {
  message: string | string[];
};

const createHeader = () => {
  const isAuthenticated = getBoolean(appAuth);
  const headers = new AxiosHeaders();
  headers.set("Content-Type", "application/json");

  if (isAuthenticated) {
    const token = getItem(appAuth);
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
};

const api = axios.create({
  baseURL: baseUrl + prefixBaseUrl,
  responseType: "json",
  headers: createHeader(),
});

api.interceptors.request.use((config) => {
  if (!config.url?.startsWith("/auth")) {
    config.headers = createHeader();
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    const { data } = response;

    if (response.status >= 500) {
      notify.error("Erro interno, tente novamente mais tarde!");
      error.message = data?.message;
    }

    if (response.status === 401 || response.status === 403) {
      notify.info("Sessão expirada, faça login novamente!");
      removeItem(appAuth);
      removeItem(appUser);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      return Promise.reject(error);
    }

    if (data?.details?.length) {
      const errors = data.details.join("\n");
      notify.error(errors);
    }

    return Promise.reject(error);
  }
);

export { api, AxiosError };
