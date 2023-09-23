import { config } from "dotenv";

config();

const defineEnv = (envName: string) => {
	const normalizedEnv = envName.toUpperCase();
	const env = process.env[normalizedEnv];
	if (env) {
		return env;
	}
	throw new Error(`Environment variable ${normalizedEnv} is not defined`);
};

export default {
	secret: defineEnv("SECRET"),
	port: defineEnv("PORT"),
	salt: defineEnv("SALT")
};
