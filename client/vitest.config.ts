import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    coverage: {
      include: ["src/**/*.{ts,tsx}"], // Include all TypeScript files in src
      reporter: ["text", "json", "html"], // Optional: coverage report formats
    },
    globals: true,
    environment: "jsdom",
    setupFiles: "./test-setup.ts",
  },
});
