"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const helpers_1 = require("../helpers");
class LoginController {
    constructor({ validation, authentication }) {
        this.validation = validation;
        this.authentication = authentication;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, helpers_1.badRequest)(error);
            }
            const { password } = httpRequest;
            const accessToken = await this.authentication.auth({ password });
            if (!accessToken) {
                return (0, helpers_1.unauthorized)();
            }
            return (0, helpers_1.success)({ accessToken });
        }
        catch (error) {
            return (0, helpers_1.serverError)(error);
        }
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=login.js.map