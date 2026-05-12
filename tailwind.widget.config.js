/**
 * Tailwind config for the embeddable widget build only.
 * Scans solely the widget component files so the generated CSS bundle
 * contains only the utilities actually used — nothing from the demo app.
 */
export default {
  content: [
    './src/components/FloatingVideoWidget.jsx',
    './src/widget/**/*.{js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
