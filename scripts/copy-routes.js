/* eslint-env node */
/* eslint no-undef: "off" */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = ['', 'login', 'register', 'boards', 'boards/favorite', 'boards/recent'];

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ dist/index.html not found. Run `vite build` first.');
  process.exit(1);
}

const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');

routes.forEach((route) => {
  const targetDir = path.join(distDir, route);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), indexHtmlContent);
  console.log(`✅ Created ${route}/index.html`);
});

// Удаляем вложенные dist, если есть
routes.forEach((route) => {
  const extraDist = path.join(distDir, route, 'dist');
  if (fs.existsSync(extraDist)) {
    fs.rmSync(extraDist, { recursive: true, force: true });
    console.log(`🧹 Cleaned up ${route}/dist`);
  }
});

console.log('🚀 SSG ready');
