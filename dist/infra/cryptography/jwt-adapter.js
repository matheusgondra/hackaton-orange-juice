"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAdapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtAdapter {
    constructor(secret) {
        this.secret = secret;
    }
    async encrypt(value) {
        return jsonwebtoken_1.default.sign({ id: value }, this.secret);
    }
    async decrypt(cipherText) {
        try {
            return jsonwebtoken_1.default.verify(cipherText, this.secret);
        }
        catch (error) {
            return null;
        }
    }
}
exports.JwtAdapter = JwtAdapter;
//# sourceMappingURL=jwt-adapter.js.map