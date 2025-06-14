import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), visualizer({ open: true })],
    server: {
      warmup: {
        clientFiles: ["./src/index.jsx"],
      },
    },
    build: {
      chunkSizeWarningLimit: 2000,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("@faker-js/faker")) {
              return "faker";
            }
          },
        },
      },
    },
  };
});
