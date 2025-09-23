import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["build/**", ".svelte-kit/**", "dist/**", "scripts/optimize-images.js"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs["flat/recommended"],
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        // extraFileExtensions: [".svelte"], // .svelteファイルはSvelte固有の設定で処理するため、ここでは不要
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", }],
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
        parser: svelte.parseForESLint,
        parserOptions: {
            parser: tseslint.parser,
            project: ["./tsconfig.json"],
            extraFileExtensions: [".svelte"],
        },
    },
    rules: {
      "no-inner-declarations": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "svelte/require-each-key": "off",
    },
  },
  {
    files: ["eslint.config.js", "svelte.config.js"],
    languageOptions: {
      parserOptions: {
        project: null, // これらのファイルではTypeScriptのプロジェクト設定を無効にする
      },
    },
  },
);

