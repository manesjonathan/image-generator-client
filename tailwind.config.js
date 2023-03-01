/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ], theme: {
        extend: {
            height: {
                'screen-custom': 'calc(var(--vh, 1vh) * 85)',
            },
        },
    },
    plugins: [],
}
