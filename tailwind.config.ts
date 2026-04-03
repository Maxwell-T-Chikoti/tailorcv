import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1a2b3d',
        paper: '#f5f5fa',
        sand: '#e5e7eb',
        moss: '#2ecc71',
        coral: '#3b82f6',
        sky: '#14b8a6'
      },
      boxShadow: {
        soft: '0 24px 80px rgba(26, 43, 61, 0.12)'
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at top left, rgba(59,130,246,0.15), transparent 35%), radial-gradient(circle at top right, rgba(20,184,166,0.12), transparent 30%), linear-gradient(180deg, #f5f5fa 0%, #f0f1f8 100%)'
      }
    }
  },
  plugins: []
};

export default config;