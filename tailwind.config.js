/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./views/*.ejs"],
	theme: {
		fontFamily: {
			krona: ["Krona One", "sans-serif"],
			londrina: ["Londrina Shadow", "cursive"],
			long: ["Long Cang", "cursive"],
			love: ["Love Light", "cursive"],
		},
		extend: {
			backgroundImage: {
				guitar:
					"url('/img/guitar.webp')",
			},
		},
	},
	plugins: [],
};
