/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Ensure this is set to 'class'
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}', // This line is crucial
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  // ... rest of config
}