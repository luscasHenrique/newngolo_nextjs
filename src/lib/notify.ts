// src/lib/notify.ts
import { toast, ToastOptions } from "react-toastify";

const baseConfig: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light", // ou "dark", ou detectar com next-themes
};

export const notify = {
  success: (msg: string) =>
    toast.success(` ${msg}`, {
      ...baseConfig,
    }),

  error: (msg: string) =>
    toast.error(` ${msg}`, {
      ...baseConfig,
      autoClose: 6000,
    }),

  info: (msg: string) =>
    toast.info(` ${msg}`, {
      ...baseConfig,
    }),

  warning: (msg: string) =>
    toast.warning(` ${msg}`, {
      ...baseConfig,
    }),
};
