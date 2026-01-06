import { defineConfig } from 'zf-dbs-vite'

export default defineConfig({
  rootDir: __dirname,
  server: {
    proxy: {
      '/xfq_service': {
        target: 'http://223.76.158.56:7000/',
        changeOrigin: true
      }
    }
  }
})
