/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // ✅ এটা অবশ্যই যোগ করতে হবে
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
