"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthMiddleware = void 0;
const middlewares_1 = require("../../../application/middlewares");
const data_1 = require("../../../data");
const cryptography_1 = require("../../../infra/cryptography");
const db_1 = require("../../../infra/db");
const env_1 = __importDefault(require("../../config/env"));
const makeAuthMiddleware = () => {
    const secret = env_1.default.secret;
    const decrypter = new cryptography_1.JwtAdapter(secret);
    const loadAdministratorByIdRepository = new db_1.AdministratorRepository();
    const loadAdministratorById = new data_1.DbLoadAdministratorById({ loadAdministratorByIdRepository });
    return new middlewares_1.AuthMiddleware({ decrypter, loadAdministratorById });
};
exports.makeAuthMiddleware = makeAuthMiddleware;
//# sourceMappingURL=auth-middleware-factory.js.map