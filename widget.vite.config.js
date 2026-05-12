/**
 * Vite config for the self-contained embeddable widget build.
 *
 * Output: dist-widget/widget.js  (single IIFE — no separate CSS file)
 *
 * All CSS (Tailwind utilities scoped to the widget component) is bundled
 * inline and injected into the Shadow DOM at runtime. The host page's
 * stylesheets are never modified.
 *
 * Build:  npm run build:widget
 * Deploy: upload dist-widget/widget.js to your CDN / hosting.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tailwindWidgetConfig from './tailwind.widget.config.js'

export default defineConfig({
  plugins: [
    react({
      // Disable Fast Refresh for the widget — it's a production-only build.
      fastRefresh: false,
    }),
  ],

  // Override PostCSS for this build to use the widget-scoped Tailwind config.
  css: {
    postcss: {
      plugins: [
        tailwindcss(tailwindWidgetConfig),
        autoprefixer(),
      ],
    },
  },

  build: {
    lib: {
      // Single entry point → single output file
      entry: 'src/widget/entry.js',

      // IIFE wraps everything in a self-executing function.
      // No module system needed — drop a <script> tag and it just runs.
      formats: ['iife'],

      // The IIFE name is unused (nothing is exported to the global scope)
      // but Rollup requires it for the format.
      name: '__FVW__',

      fileName: () => 'widget.js',
    },

    outDir: 'dist-widget',
    emptyOutDir: true,

    // Inline all CSS into widget.js (injected into Shadow DOM at runtime).
    // This keeps deployment to a single file.
    cssCodeSplit: false,

    // Vite 8 uses Rolldown/Oxc — 'true' selects the default Oxc minifier.
    minify: true,

    rollupOptions: {
      output: {
        // Inline any dynamic imports so the final output is truly one file.
        inlineDynamicImports: true,
      },
    },
  },

  // Replace Node globals that React/Framer Motion reference at build time.
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    global: 'globalThis',
  },
})
