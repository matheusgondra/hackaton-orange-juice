"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptMiddleware = void 0;
const adaptMiddleware = (middleware) => {
    return async (req, res, next) => {
        const request = {
            accessToken: req.headers?.["authorization"],
            ...(req.headers || {})
        };
        const httpResponse = await middleware.handle(request);
        if (httpResponse.statusCode === 200) {
            Object.assign(req, httpResponse.body);
            next();
        }
        else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message
            });
        }
    };
};
exports.adaptMiddleware = adaptMiddleware;
//# sourceMappingURL=express-middleware-adapter.js.map