import { defineConfig } from "vite";
import { coverageV8 } from "@vitest/coverage-v8";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
