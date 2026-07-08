import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          600: '#0066ff',
          700: '#0052cc',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          900: '#0f172a',
        },
        green: {
          600: '#22c55e',
        },
        red: {
          600: '#dc2626',
        },
        amber: {
          400: '#fbbf24',
        },
        purple: {
          600: '#9333ea',
        },
      },
    },
  },
  plugins: [],
}
export default config