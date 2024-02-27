/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["nimbus-sans", `sans-serif`],
        display: ["nimbus-sans-extended", `sans-serif`],
      },
      keyframes: {
        "scrolling-banner": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - var(--gap)/2))" },
        },
        "scrolling-banner-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-50% - var(--gap)/2))" },
        },
      },
      animation: {
        "scrolling-banner": "scrolling-banner var(--duration) linear infinite",
        "scrolling-banner-vertical":
          "scrolling-banner-vertical var(--duration) linear infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              50: "#f1f2fd",
              100: "#dce0f9",
              200: "#c5cbf5",
              300: "#aeb6f1",
              400: "#9ca6ee",
              500: "#8b96eb",
              600: "#838ee9",
              700: "#7883e5",
              800: "#6e79e2",
              900: "#5b68dd",
            },
            secondary: {
              50: "#e1e2e8",
              100: "#b4b7c6",
              200: "#8287a0",
              300: "#50577a",
              400: "#2b335e",
              500: "#050f41",
              600: "#040d3b",
              700: "#040b32",
              800: "#03082a",
              900: "#01041c",
            },
            accent: {
              50: "#e4f4f6",
              100: "#bbe4ea",
              200: "#8ed2dc",
              300: "#61bfcd",
              400: "#3fb2c3",
              500: "#1da4b8",
              600: "#1a9cb1",
              700: "#1592a8",
              800: "#1189a0",
              900: "#0a7891",
              A100: "#bff2ff",
              A200: "#8ce7ff",
              A400: "#59dcff",
              A700: "#40d7ff",
            },
            neutral: {
              50: "#f3f3f3",
              100: "#e2e2e2",
              200: "#cecece",
              300: "#bababa",
              400: "#acacac",
              500: "#9d9d9d",
              600: "#959595",
              700: "#8b8b8b",
              800: "#818181",
              900: "#6f6f6f",
            },
            success: {
              50: "#e4f7eb",
              100: "#bcebce",
              200: "#90deae",
              300: "#63d18d",
              400: "#41c774",
              500: "#20bd5c",
            },
            warning: {
              50: "#fff4e5",
              100: "#ffe5be",
              200: "#ffd393",
              300: "#ffc167",
              400: "#ffb447",
              500: "#ffa726",
              600: "#ff9f22",
              700: "#ff961c",
              800: "#ff8c17",
              900: "#ff7c0d",
            },
            error: {
              50: "#ffe7e5",
              100: "#ffc4be",
              200: "#ff9d93",
              300: "#ff7567",
              400: "#ff5847",
              500: "#ff3a26",
              600: "#ff3422",
              700: "#ff2c1c",
              800: "#ff2517",
              900: "#ff180d",
            },
          },
        },
      },
    }),
  ],
};
