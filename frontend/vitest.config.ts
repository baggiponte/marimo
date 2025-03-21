/* Copyright 2023 Marimo. All rights reserved. */
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts"],
  },
  plugins: [tsconfigPaths()],
});
