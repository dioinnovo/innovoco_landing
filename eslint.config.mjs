import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * "Lint" = any static analysis that flags likely bugs/style issues.
 * ESLint = the de facto linter for JavaScript/TypeScript; `pnpm run lint` runs ESLint here.
 *
 * Next.js bundles `eslint-config-next` (React, Hooks, jsx-a11y, import, @typescript-eslint).
 * Rules below relax a few pedantic defaults so `pnpm run check` stays usable while hooks/a11y stay strict.
 */
export default defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Marketing/copy-heavy JSX: escaping every `'`/`"` hurts readability; browsers handle UTF-8 fine.
      "react/no-unescaped-entities": "off",
      // Incremental typing: enable as `any` is reduced across lib/voice and API routes.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      // React Compiler rule; many valid patterns (sync prop→state, Lenis, theme) still use this.
      "react-hooks/set-state-in-effect": "off",
      // Intentionally incomplete deps are common for event subscriptions and one-shot effects.
      "react-hooks/exhaustive-deps": "off",
      // Re-enable incrementally; many legacy params/imports are intentionally unused.
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "coverage/**",
    "public/**",
    "langgraph_env/**",
    "nextjs-app/**",
    "scripts/**",
    "tests/**",
    "test-voice-lead-flow.ts",
    "*.config.mjs",
    "sanity.config.ts",
    "postcss.config.*",
    "next-env.d.ts",
  ]),
]);
