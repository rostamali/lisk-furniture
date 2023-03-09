declare global {
	namespace NodeJS {
		interface ProcessEnv {
			STRIPE_PUBLISH_KEY: string;
			STRIPE_SECRET_KEY: string;
			BASE_URL: string;
			MONGODB_URL: string;
		}
	}
}

export {};
