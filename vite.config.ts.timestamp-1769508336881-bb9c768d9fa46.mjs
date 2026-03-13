// vite.config.ts
import { defineConfig } from "file:///D:/web-project/20251226-xfqszls-bs/node_modules/.pnpm/zf-dbs-vite@1.0.4_javascript-obfuscator@5.1.0_rollup@4.54.0_zf-vue-web-vite@0.1.17/node_modules/zf-dbs-vite/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\web-project\\20251226-xfqszls-bs";
var vite_config_default = defineConfig({
  rootDir: __vite_injected_original_dirname,
  server: {
    proxy: {
      "/xfq_service": {
        target: "http://223.76.158.56:7000/",
        changeOrigin: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3ZWItcHJvamVjdFxcXFwyMDI1MTIyNi14ZnFzemxzLWJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3ZWItcHJvamVjdFxcXFwyMDI1MTIyNi14ZnFzemxzLWJzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93ZWItcHJvamVjdC8yMDI1MTIyNi14ZnFzemxzLWJzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAnemYtZGJzLXZpdGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJvb3REaXI6IF9fZGlybmFtZSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHByb3h5OiB7XHJcbiAgICAgICcveGZxX3NlcnZpY2UnOiB7XHJcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzIyMy43Ni4xNTguNTY6NzAwMC8nLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThSLFNBQVMsb0JBQW9CO0FBQTNULElBQU0sbUNBQW1DO0FBRXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxFQUNULFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLGdCQUFnQjtBQUFBLFFBQ2QsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
