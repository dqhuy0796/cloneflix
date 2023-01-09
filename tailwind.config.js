/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "primary-color": "#e73631",
                "light-100": "#bebfc0",
                "light-500": "#e0e0e0",
                "light-900": "#f0f0f0",
                "dark-100": "#575858",
                "dark-500": "#2f2f2f",
                "dark-900": "#181818",
            },
            boxShadow: {
                xs: "1px 1px 3px 0 rgba(0, 0, 0, 0.3), -1px -1px 3px 0 rgba(0, 0, 0, 0.3) ",
            },
            gridTemplateColumns: {
                "autofit-120": "repeat(auto-fit, minmax(120px, 1fr))",
                "autofit-180": "repeat(auto-fit, minmax(180px, 1fr))",
                "autofit-240": "repeat(auto-fit, minmax(240px, 1fr))",
                "autofit-300": "repeat(auto-fit, minmax(280px, 1fr))",
            },
            backgroundImage: {
                "movie-theatre": "url('./assets/images/movie-theatre.jpg')",
                "mind-hunter": "url('./assets/images/mindhunter.png')",
            },
        },
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        //...
    ],
    mode: "jit",
};
