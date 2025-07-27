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
        grant: ['GM_getValue', 'GM_setValue'],
        homepage: packageJson.homepage,
        supportURL: `${packageJson.homepage}/issues`,
        updateURL: `${packageJson.homepage}/releases/latest/download/github-enhance.user.js`,
        downloadURL: `${packageJson.homepage}/releases/latest/download/github-enhance.user.js`,
      },
      build: {
        externalGlobals: {
          // preact: cdn.jsdelivr('preact', 'dist/preact.umd.js'),
          // clsx: cdn.jsdelivr('clsx', 'dist/clsx.min.js'),
          // 'tailwind-merge': cdn.jsdelivr(
          //   'tailwind-merge',
          //   'dist/tailwind-merge.min.js'
          // ),
          // 'class-variance-authority': cdn.jsdelivr(
          //   'class-variance-authority',
          //   'dist/index.js'
          // ),
          // 'lucide-react': cdn.jsdelivr(
          //   'lucide-react',
          //   'dist/umd/lucide-react.min.js'
          // ),
          // 按需加载esm可以不打包
          // '@mudssky/jsutils': cdn.jsdelivr(
          //   '@mudssky/jsutils',
          //   'dist/umd/index.js'
          // ),
        },
        // externalResource
      },
    }),
  ],
  build: {
    assetsDir: 'assets',
    minify: false,
    cssCodeSplit: false,
    // cssMinify: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }

          return null
        },
        assetFileNames: (assetInfo) => {
          // console.log({ assetInfo })

          if (assetInfo.names?.[0]?.endsWith('.css')) {
            return 'css/style.css'
          }
          return '[name].[hash].[ext]'
        },
      },
    },
  },
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
