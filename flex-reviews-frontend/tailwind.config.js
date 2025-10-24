/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Ensure backdrop blur is supported
      backdropBlur: {
        md: "12px",
        sm: "4px",
      },
    },
  },
  plugins: [],
  // Enable core plugins that might be needed
  corePlugins: {
    backdropBlur: true,
  },
};