/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['images.unsplash.com'],
	},
	env: {
		STRIPE_PUBLISH_KEY: process.env.STRIPE_PUBLISH_KEY,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		BASE_URL: process.env.BASE_URL,
		MONGODB_URL: process.env.MONGODB_URL,
	},
};

module.exports = nextConfig;
