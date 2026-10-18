import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { alabaster: '#FAFAF7', ivory: '#F6F3ED', espresso: '#1C1A17', sage: '#5B6B54', 'sage-dark': '#4A5744', taupe: '#B5A48B' },
    fontFamily: { sans: ['DM Sans', 'sans-serif'], serif: ['Playfair Display', 'serif'] },
    boxShadow: { soft: '0 18px 55px rgba(28, 26, 23, 0.08)' },
  }},
  plugins: [],
}

export default config
