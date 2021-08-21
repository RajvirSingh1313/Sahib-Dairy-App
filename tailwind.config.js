module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors:{
      blue:{
        bg:"#49597A",
        light:"#6FC2FF",
        dark:"#3390FD",
        error:"#EF4444",
        success:"#10B981",
        white:"#F9FAFB",
        yellow:"#FFD700"
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}