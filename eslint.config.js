import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin"; // Corrected import
import tseslintParser from "@typescript-eslint/parser"; // Corrected import
import sveltePlugin from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    // グローバル設定
    ignores: ["build/**", ".svelte-kit/**", "dist/**", "scripts/optimize-images.js"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        extraFileExtensions: [".svelte"],
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      svelte: sveltePlugin, // グローバルスコープでsvelteプラグインを登録
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      // svelteの推奨ルールは.svelteファイルで適用するためここでは含めない
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", }],
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  {
    // .svelteファイル固有の設定
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslintParser,
      },
    },
    // .svelteファイルでは、グローバルで登録したsvelteプラグインのルールを適用
    rules: {
      ...sveltePlugin.configs.recommended.rules,
      "no-inner-declarations": "off",
      "@typescript-eslint/no-unused-vars": "off", // SvelteファイルではSvelteのルールで処理されるためオフ
    },
  },
  // Prettier設定は最後に適用し、競合するESLintルールを無効化する
  prettierConfig,
];

