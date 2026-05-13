/**
 * Tailwind CSS Configuration
 * Generated for the Cybersecurity Portfolio project.
 */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Cybersecurity neon palette
        primary: "hsl(210, 100%, 55%)",
        secondary: "hsl(190, 60%, 45%)",
        accent: "hsl(160, 70%, 50%)",
        darkBg: "hsl(220, 15%, 10%)",
        lightBg: "hsl(0, 0%, 100%)",
        glass: "rgba(255, 255, 255, 0.08)"
      },
      backdropBlur: {
        xs: "2px"
      },
      boxShadow: {
        neon: "0 0 10px var(--tw-shadow-color), 0 0 20px var(--tw-shadow-color), 0 0 30px var(--tw-shadow-color)"
      }
    }
  },
  plugins: []
};
