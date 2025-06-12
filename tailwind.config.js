// @ts-check
/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Catppuccin Frappe colors
        ctp: {
          base: '#303446',
          crust: '#232634',
          mantle: '#292c3c',
          surface0: '#414559',
          surface1: '#51576d',
          surface2: '#626880',
          overlay0: '#737994',
          overlay1: '#838ba7',
          overlay2: '#949cbb',
          text: '#c6d0f5',
          subtext1: '#b5bfe2',
          subtext0: '#a5adce',
          blue: '#8caaee',
          lavender: '#babbf1',
          sapphire: '#85c1dc',
          sky: '#99d1db',
          teal: '#81c8be',
          green: '#a6d189',
          yellow: '#e5c890',
          peach: '#ef9f76',
          maroon: '#ea999c',
          red: '#e78284',
          mauve: '#ca9ee6',
          pink: '#f4b8e4',
          flamingo: '#eebebe',
          rosewater: '#f2d5cf',
        },
        // Neon colors for UI accents
        neon: {
          cyan: '#33ccff',
          green: '#00ff99',
          pink: '#ff2d75',
          purple: '#b967ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        heading: ['Oxanium', 'sans-serif'],
      },
      boxShadow: {
        'neon-sm': '0 0 5px rgb(51, 204, 255), 0 0 10px rgb(51, 204, 255)',
        'neon': '0 0 10px rgb(51, 204, 255), 0 0 20px rgb(51, 204, 255)',
        'neon-lg': '0 0 15px rgb(51, 204, 255), 0 0 30px rgb(51, 204, 255)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        neonPulse: {
          '0%, 100%': { textShadow: '0 0 5px rgb(51, 204, 255), 0 0 10px rgb(51, 204, 255)' },
          '50%': { textShadow: '0 0 15px rgb(51, 204, 255), 0 0 30px rgb(51, 204, 255)' },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
}
