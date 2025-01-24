import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        custom1: ['FeelingPassionate', 'cursive'],
        custom2: ['GlossAndBloom', 'sans-serif'],
        custom3: ['Montserrat-Regular', 'sans-serif'],
        custom4: ['Montserrat-ExtraBold', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;