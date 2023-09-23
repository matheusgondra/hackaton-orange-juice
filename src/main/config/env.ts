const defineEnv = (env: string): string => {
	const newEnv = process.env[env];
	if (!newEnv) {
		throw new Error(`Missing env ${env}`);
	}
	return newEnv;
};

export default {
	secret: defineEnv("SECRET"),
	port: defineEnv("PORT"),
	salt: defineEnv("SALT")
};
