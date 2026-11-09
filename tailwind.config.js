/**
 * ⚠️ NON UTILISÉ — Ce projet est en Tailwind CSS v4, qui ne lit plus ce fichier.
 * La palette de marque (bleu) est définie dans `src/index.css`, bloc `@theme`.
 * Ce fichier n'est conservé que pour référence et n'a aucun effet sur le rendu.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef4fb',
          100: '#d9e6f7',
          200: '#b3cdef',
          300: '#84acE3',
          400: '#4f83d2',
          500: '#2a5fb8',
          600: '#1c4fa1',
          700: '#163f82',
          800: '#123268',
          900: '#0e274f',
          950: '#081a35',
        },
        dark: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'count-up': 'countUp 2s ease-out forwards',
      },
    },
  },
  plugins: [],
};
