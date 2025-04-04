import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_PORT || '3000'), // Cambiar por el puerto deseado
    open: true   // Opcional: abrir navegador automáticamente
  },
})
