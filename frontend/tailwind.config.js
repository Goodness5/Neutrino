/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xsm': '350px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      bigDesktop: { max: "3200px" }, //Big desktop
      semiBigDesktop: { max: "1920px" },
      bigScreen:{max: "1539"},
      bSemiBig: { max: "1440px" }, //1440
      bSemismall: { max: "1366px" }, //
      lgDesktop: { max: "1280px" }, //large desktop
      smDesktop: { max: "1024px" }, // small desktop
      smDesk: { max: "917px" }, // small desktop
      tabletAir: { max: "820px" }, // small desktop
      tablet: { max: "768px" },
      extraTab:{max:"540px"},
      mobile: { max: "480px" },
      Xmobile: { max: "360px" },
      smMobile: { max: "320px" },
    },
    extend: {},
  },
  plugins: [],
}

