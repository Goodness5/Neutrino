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
    extend: {
      // backgroundImage: {
      //   homeImage: "url('./public/home assets/photo.png')",
      //   image1: "url('./public/home assets/Photo1.png')",
      //   image2: "url('./public/home assets/Photo2.png')",
      //   image3: "url('./public/home assets/Photo3.png')",
      //   image4: "url('./public/home assets/Photo4.png')",
      //   image5: "url('./public/home assets/Photo5.png')",
      //   image6: "url('./public/home assets/Photo7.png')",
      //   image7: "url('./public/home assets/Photo8.png')",
      // },
    },
  },
  plugins: [],
};
