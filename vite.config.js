import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

/** @type {import('vite').UserConfig} */
export default defineConfig(() => {
  return {
    //@eslint-disable-next-line
    base: process.env.NODE_ENV === "production" ? "/qr-generation/" : "/",
    plugins: [tailwindcss()],
    input: {
      index: resolve(import.meta.dirname, "index.html"),
      decode: resolve(import.meta.dirname, "decode/index.html"),
      transfer: resolve(
        import.meta.dirname,
        "transfermovil-transfer/index.html",
      ),
    },
  };
});
