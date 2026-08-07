import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

/** @type {import('vite').UserConfig} */
export default {
  plugins: [tailwindcss()],
  input: {
    index: resolve(import.meta.dirname, "index.html"),
    decode: resolve(import.meta.dirname, "decode/index.html"),
    transfer: resolve(import.meta.dirname, "transfermovil-transfer/index.html"),
  },
};
