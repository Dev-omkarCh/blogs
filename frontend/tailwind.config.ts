/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Ensure this is set to 'class'
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}', // This line is crucial
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  extend: {
      colors: {
        // You can define variables that change based on the .dark class
        dashboard: {
          bg: 'var(--bg-color)',
          card: 'var(--card-color)',
        }
      }
    },
  // ... rest of config
}