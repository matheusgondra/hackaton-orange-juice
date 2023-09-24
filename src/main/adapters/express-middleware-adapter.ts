import { NextFunction, Request, Response } from "express";
import { Middleware } from "../../application/protocols";

export const adaptMiddleware = (middleware: Middleware) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const request = {
			accessToken: req.headers?.["authorization"],
			...(req.headers || {})
		};
		const httpResponse = await middleware.handle(request);
		if (httpResponse.statusCode === 200) {
			Object.assign(req, httpResponse.body);
			next();
		} else {
			res.status(httpResponse.statusCode).json({
				error: httpResponse.body.message
			});
		}
	};
};
