/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                mainCol: "#63b9ff",
                textCol: "#31514e",
            },
        },
    },
    plugins: [require("daisyui")],
};
