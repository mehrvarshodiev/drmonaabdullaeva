import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: {
      alabaster: 'rgb(var(--color-alabaster) / <alpha-value>)',
      ivory: 'rgb(var(--color-ivory) / <alpha-value>)',
      espresso: 'rgb(var(--color-espresso) / <alpha-value>)',
      sage: 'rgb(var(--color-sage) / <alpha-value>)',
      'sage-dark': 'rgb(var(--color-sage-dark) / <alpha-value>)',
      taupe: 'rgb(var(--color-taupe) / <alpha-value>)',
      stone: {
        50: 'rgb(var(--stone-50) / <alpha-value>)', 100: 'rgb(var(--stone-100) / <alpha-value>)',
        200: 'rgb(var(--stone-200) / <alpha-value>)', 300: 'rgb(var(--stone-300) / <alpha-value>)',
        400: 'rgb(var(--stone-400) / <alpha-value>)', 500: 'rgb(var(--stone-500) / <alpha-value>)',
        600: 'rgb(var(--stone-600) / <alpha-value>)', 700: 'rgb(var(--stone-700) / <alpha-value>)',
        800: 'rgb(var(--stone-800) / <alpha-value>)', 900: 'rgb(var(--stone-900) / <alpha-value>)',
      },
    },
    fontFamily: { sans: ['DM Sans', 'sans-serif'], serif: ['Playfair Display', 'serif'] },
    boxShadow: { soft: '0 18px 55px rgba(28, 26, 23, 0.08)' },
  }},
  plugins: [],
}

export default config
