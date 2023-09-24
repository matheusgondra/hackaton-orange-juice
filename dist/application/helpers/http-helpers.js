"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.created = exports.noContent = exports.success = exports.serverError = exports.conflict = exports.unauthorized = exports.badRequest = void 0;
const errors_1 = require("../errors");
const badRequest = (error) => ({
    statusCode: 400,
    body: error
});
exports.badRequest = badRequest;
const unauthorized = () => ({
    statusCode: 401,
    body: new errors_1.UnauthorizedError()
});
exports.unauthorized = unauthorized;
const conflict = () => ({
    statusCode: 409,
    body: new Error("The event already exists")
});
exports.conflict = conflict;
const serverError = (error) => ({
    statusCode: 500,
    body: error
});
exports.serverError = serverError;
const success = (data) => ({
    statusCode: 200,
    body: data
});
exports.success = success;
const noContent = () => ({
    statusCode: 204,
    body: null
});
exports.noContent = noContent;
const created = (data) => ({
    statusCode: 201,
    body: data
});
exports.created = created;
//# sourceMappingURL=http-helpers.js.map