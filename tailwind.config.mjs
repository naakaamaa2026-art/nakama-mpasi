/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDF5F0',
          100: '#FCE7DD',
          200: '#F8CEBC',
          300: '#F2AC91',
          400: '#E47B53',
          500: '#CC5420',
          600: '#B7410E', // Merah Bata utama
          700: '#96340B',
          800: '#7A2C0D',
          900: '#64260E',
          DEFAULT: '#B7410E',
        },
        beige: {
          50: '#FAF9F2',
          100: '#F7F6E9',
          200: '#F5F3E0', // Beige utama
          300: '#ECE8CD',
          400: '#DFD8B4',
          500: '#CEC499',
          600: '#B8AC7E',
          700: '#94885F',
          800: '#706644',
          900: '#4E462E',
          DEFAULT: '#F5F3E0',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(183, 65, 14, 0.12)',
        'glass': '0 8px 32px 0 rgba(183, 65, 14, 0.08)',
      },
    },
  },
  plugins: [],
};
