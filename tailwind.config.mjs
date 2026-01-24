/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        // Inter with a fallback to system sans-serif looks closest to the screenshot
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionProperty: {
        'font': 'font-size, line-height, letter-spacing', // Smooth font resizing
      }
    },
  },
  plugins: [],
}
