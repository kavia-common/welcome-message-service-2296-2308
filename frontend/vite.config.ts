import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Explicit port for consistency; backend runs separately.
    port: 5173,
    strictPort: true
  }
});
