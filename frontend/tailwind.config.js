/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores personalizada
        brand: {
          purple: '#BE00FE',
          'purple-light': '#EAE6F6',
          'purple-extralight': '#F9F3F9',
        },
        accent: {
          yellow: '#FDBC3D',
          green: '#DDF6EC',
        },
        text: {
          primary: '#3C3C3C',
          secondary: '#666666',
          tertiary: '#707070',
        },
        background: {
          main: '#FBFBFB',
          alt: '#FCFCFC',
          subtle: '#F1F1F1',
          warm: '#FAF8F5',
        },
        border: {
          main: '#D9D9D9',
          secondary: '#C1C1C1',
        },
        white: '#FFFFFF',
        overlay: 'rgba(0, 0, 0, 0.16)', // Corresponde a #00000029

        // Paletas existentes (se pueden mantener o reemplazar)
        primary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
