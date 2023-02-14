/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			backgroundColor: {
				hover: "#e4e6e9c5",
			},
		},
	},
	plugins: [
		require("@tailwindcss/line-clamp"),
		require("tailwind-scrollbar"),
	],
};
