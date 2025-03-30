import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  // Cho phép Vite sử dụng được process.env
  // https://github.com/vitejs/vite/issues/1973
  // eslint-disable-next-line no-undef
  define: { 'process.env': process.env },
  plugins: [react(), svgr()],
  // base: './'
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
});
