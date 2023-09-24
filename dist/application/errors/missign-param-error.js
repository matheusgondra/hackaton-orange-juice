"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissignParamError = void 0;
class MissignParamError extends Error {
    constructor(paramName) {
        super(`Missing param: ${paramName}`);
        this.name = "MissignParamError";
    }
}
exports.MissignParamError = MissignParamError;
//# sourceMappingURL=missign-param-error.js.map