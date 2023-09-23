import { Decrypter } from "../../data";
import { unauthorized } from "../helpers";
import { HttpResponse, Middleware } from "../protocols";

export class AuthMiddleware implements Middleware {
	private readonly decrypter: Decrypter;

	constructor({ decrypter }: AuthMiddleware.Dependencies) {
		this.decrypter = decrypter;
	}

	async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
		const { accessToken } = request;
		if (!accessToken) {
			return unauthorized();
		}

		await this.decrypter.decrypt(accessToken);

		return {
			statusCode: 200,
			body: ""
		};
	}
}

export namespace AuthMiddleware {
	export interface Dependencies {
		decrypter: Decrypter;
	}
	export interface Request {
		accessToken?: string;
	}
}
