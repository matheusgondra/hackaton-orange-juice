"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginController = void 0;
const controllers_1 = require("../../../application/controllers");
const data_1 = require("../../../data");
const cryptography_1 = require("../../../infra/cryptography");
const db_1 = require("../../../infra/db");
const validation_1 = require("../../../validation");
const env_1 = __importDefault(require("../../config/env"));
const makeLoginController = () => {
    const secret = env_1.default.secret;
    const encrypter = new cryptography_1.JwtAdapter(secret);
    const salt = Number(env_1.default.salt);
    const hashComparer = new cryptography_1.BcryptAdapter({ salt });
    const loadAdministratorByNameRepository = new db_1.AdministratorRepository();
    const authentication = new data_1.DbAuthentication({ encrypter, hashComparer, loadAdministratorByNameRepository });
    const validations = [new validation_1.RequiredFieldValidation("password")];
    const validation = new validation_1.ValidationComposite(validations);
    return new controllers_1.LoginController({ authentication, validation });
};
exports.makeLoginController = makeLoginController;
//# sourceMappingURL=login-controller-factory.js.map