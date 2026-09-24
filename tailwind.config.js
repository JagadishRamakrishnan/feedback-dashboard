/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        cream: {
          DEFAULT: "#F5F1E7",
          50: "#FDFCFA",
          100: "#F5F1E7",
          200: "#EFE9DA",
        },
        maroon: {
          50: "#FBEEEA",
          100: "#F1D6CB",
          300: "#C47A5C",
          500: "#9A4A32",
          600: "#833A26",
          700: "#6B2E1D",
          800: "#552314",
          900: "#3D190D",
        },
        ink: {
          DEFAULT: "#241C15",
          soft: "#6B5F4F",
          faint: "#A79C88",
        },
        border: {
          DEFAULT: "#E7DFCC",
        },
        success: "#2F7A4D",
        successBg: "#E4F2E8",
        warning: "#B8791A",
        warningBg: "#FBEFDA",
        danger: "#B23A2E",
        dangerBg: "#FBE7E3",
        neutralBg: "#EFEBE2",
      },
      boxShadow: {
        card: "0 1px 2px rgba(36, 28, 21, 0.04), 0 8px 24px -12px rgba(36, 28, 21, 0.10)",
      },
      borderRadius: {
        xl2: "1.1rem",
      },
    },
  },
  plugins: [],
};
