import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import { tailwindSyntax } from "@eslint/css/syntax";
import tailwind from "eslint-plugin-tailwindcss";

export default defineConfig([
  ...tailwind.configs["flat/recommended"],
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  {
    files: ["**/*.css"],
    plugins: { css },
    extends: ["plugin:tailwindcss/recommended"],
    language: "css/css",
    languageOptions: {
      customSyntax: tailwindSyntax,
      tolerant: true,
    },
    rules: {

    },
  }
]);
