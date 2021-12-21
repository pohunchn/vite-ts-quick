import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import { changePackageVersion } from "./build/plugins"
import { readdirSync } from 'fs';

/**
 * 获取多入口文件
 * @returns 
 */
export function getPages() {
  let pagePath = resolve(__dirname, "./src/pages");
  let files: string[] = readdirSync(pagePath);
  let pages: { [key: string]: string } = {
    main: resolve(__dirname, 'index.html')
  };
  for (let i = 0; i < files.length; i++) {
    let key = files[i].replace('.html', '');
    if (key === 'index') continue;
    pages[key] = resolve(__dirname, `src/pages/${files[i]}`);
  }
  return pages;
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  server: {
    host: process.env.NODE_ENV !== "production"
  },
  plugins: [
    changePackageVersion(),
    vue({
      refTransform: [/src/]
    })
  ],
  build: {
    rollupOptions: {
      input: getPages(),
    }
  }
})
