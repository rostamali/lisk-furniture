module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				mulish: ['Mulish'],
				poppins: ['Poppins'],
				workSans: ['Work Sans'],
			},
		},
		colors: {
			green: {
				success: '#8FD021',
			},
			orange: {
				dark: '#FAAD3D',
			},
			white: {
				DEFAULT: '#FFFFFF',
			},
			gray: {
				light: '#F6F6F6',
				thin: '#666666',
				normal: '#979797',
				dark: '#999999',
			},
			black: '#000000',
		},
		container: {
			center: true,
			padding: '1rem',
			screens: {
				sm: '600px',
				md: '728px',
				lg: '984px',
				xl: '1240px',
				'2xl': '1240px',
			},
		},
	},
	plugins: [require('flowbite/plugin')],
};
