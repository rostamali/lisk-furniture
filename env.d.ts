declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MY_DOMAIN: string;
			STRIPE_PUBLISH_KEY: string;
			STRIPE_SECRET_KEY: string;
			MONGODB_URL: string;
		}
	}
}

export {};
