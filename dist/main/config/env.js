"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const defineEnv = (envName) => {
    const normalizedEnv = envName.toUpperCase();
    const env = process.env[normalizedEnv];
    if (env) {
        return env;
    }
    throw new Error(`Environment variable ${normalizedEnv} is not defined`);
};
exports.default = {
    secret: defineEnv("SECRET"),
    port: defineEnv("PORT"),
    salt: defineEnv("SALT")
};
//# sourceMappingURL=env.js.map