import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths"; // To resolve paths if you use them in tsconfig

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": "/src", // Ensure any aliases are properly set up
    },
  },
  optimizeDeps: {
    include: ["@storybook/react", "react", "react-dom"],
  },
});
