import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#82db12",
          
 "secondary": "#62DAC2",
          
 "accent": "#00f35c",
          
 "neutral": "#190d18",
          
 "base-100": "#FFFFFF",
          
 "info": "#00a8ff",
          
 "success": "#00ffa2",
          
 "warning": "#957000",
          
 "error": "#cf3450",
        }
      }
    ],
  },
  plugins: [require('daisyui')],
}
export default config
