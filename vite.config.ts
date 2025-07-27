import path from 'node:path'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'
import packageJson from './package.json'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    tailwindcss(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: packageJson.homepage,
        description: packageJson.description,
        match: ['https://github.com/*'],
        author: packageJson.author,
        version: packageJson.version,
        license: packageJson.license,
        'run-at': 'document-end',
        homepage: packageJson.homepage,
        supportURL: `${packageJson.homepage}/issues`,
        updateURL: `${packageJson.homepage}/releases/latest/download/github-enhance.user.js`,
        downloadURL: `${packageJson.homepage}/releases/latest/download/github-enhance.user.js`,
      },
      build: {
        // externalGlobals: {
        //   preact: cdn.jsdelivr('preact', 'dist/preact.min.js'),
        // },
      },
    }),
  ],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
