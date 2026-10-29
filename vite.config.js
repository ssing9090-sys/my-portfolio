import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/** GitHub Pages 저장소 경로(https://{사용자명}.github.io/my-portfolio/)에 맞춘 base 설정 */
export default defineConfig({
  base: '/my-portfolio/',
  plugins: [react()],
});
