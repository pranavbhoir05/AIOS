// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173, // Force this port
        strictPort: true, // Fail if port taken (optional)
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                // This eliminates CORS entirely!
            }
        }
    }
});