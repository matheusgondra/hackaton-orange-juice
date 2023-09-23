import { unauthorized } from "../helpers";
import { HttpResponse, Middleware } from "../protocols";

export class AuthMiddleware implements Middleware {
	async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
		const { accessToken } = request;
		if (!accessToken) {
			return unauthorized();
		}
		return {
			statusCode: 200,
			body: ""
		};
	}
}

export namespace AuthMiddleware {
	export interface Request {
		accessToken?: string;
	}
}
