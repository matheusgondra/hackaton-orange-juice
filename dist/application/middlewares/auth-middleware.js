"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const helpers_1 = require("../helpers");
class AuthMiddleware {
    constructor({ decrypter, loadAdministratorById }) {
        this.decrypter = decrypter;
        this.loadByAdministratorById = loadAdministratorById;
    }
    async handle(request) {
        const { accessToken } = request;
        if (!accessToken) {
            return (0, helpers_1.unauthorized)();
        }
        const formatedAccessToken = accessToken.replace("Bearer ", "");
        const token = await this.decrypter.decrypt(formatedAccessToken);
        if (!token) {
            return (0, helpers_1.unauthorized)();
        }
        const id = Number(token.id);
        const isExist = await this.loadByAdministratorById.loadById(id);
        if (!isExist) {
            return (0, helpers_1.unauthorized)();
        }
        return (0, helpers_1.success)({ id });
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth-middleware.js.map