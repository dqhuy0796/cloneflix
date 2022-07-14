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
                "dark-500": "#1e2123",
                "dark-900": "#070707",
            },
        },
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        //...
    ],
    mode: "jit",
};
