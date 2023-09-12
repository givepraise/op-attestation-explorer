import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-1": "#ed4537",
        "theme-2": "#FF6E5B",
        "theme-3": "#FFA990",
        "theme-gray-1": "#EAECEB",
      },
      boxShadow: {
        "theme-shadow-1": "0 0 10px 2px rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/container-queries"),
  ],
};
export default config;
