import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        "2xs": ".625rem",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config;
