import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      // padding: '1rem',
    },
    extend: {
      colors: {
        text: {
          DEFAULT: '#212121',
          50: '#0d0d0d',
          100: '#1a1a1a',
          200: '#333333',
          300: '#4d4d4d',
          400: '#666666',
          500: '#808080',
          600: '#999999',
          700: '#b3b3b3',
          800: '#cccccc',
          900: '#e6e6e6',
          950: '#f2f2f2',
        },
        background: {
          DEFAULT: '#F5F5F5',
          50: '#0d0d0d',
          100: '#1a1a1a',
          200: '#333333',
          300: '#4d4d4d',
          400: '#666666',
          500: '#808080',
          600: '#999999',
          700: '#b3b3b3',
          800: '#cccccc',
          900: '#e6e6e6',
          950: '#f2f2f2',
        },
        primary: {
          DEFAULT: '#5D4037',
          50: '#100b09',
          100: '#201613',
          200: '#402c26',
          300: '#604239',
          400: '#81584b',
          500: '#a16e5e',
          600: '#b48b7e',
          700: '#c6a89f',
          800: '#d9c5bf',
          900: '#ece2df',
          950: '#f6f0ef',
        },
        secondary: {
          DEFAULT: '#c6b2a0',
          50: '#100d0a',
          100: '#201913',
          200: '#403226',
          300: '#604b39',
          400: '#80644d',
          500: '#9f7d60',
          600: '#b39780',
          700: '#c6b19f',
          800: '#d9cbbf',
          900: '#ece5df',
          950: '#f5f2ef',
        },
        accent: {
          DEFAULT: '#FFCC80',
          50: '#1a0f00',
          100: '#331f00',
          200: '#663d00',
          300: '#995c00',
          400: '#cc7a00',
          500: '#ff9900',
          600: '#ffad33',
          700: '#ffc266',
          800: '#ffd699',
          900: '#ffebcc',
          950: '#fff5e5',
        },
      },

      fontFamily: {
        outfit: ['var(--font-outfit)'],
      },
    },
  },
  plugins: [],
};
export default config;
