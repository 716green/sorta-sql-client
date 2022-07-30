import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import url from "url";

export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
  },
  resolve: {
    alias: {
      "@": url.fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [vue()],
});
