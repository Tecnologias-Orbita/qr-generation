import html from "eslint-plugin-html";
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs, html}"],
    plugins: { js, html },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
]);
