import { Decrypter } from "../../data";
import { LoadAdministratorById } from "../../domain";
import { unauthorized } from "../helpers";
import { HttpResponse, Middleware } from "../protocols";

export class AuthMiddleware implements Middleware {
	private readonly decrypter: Decrypter;
	private readonly loadByAdministratorById: LoadAdministratorById;

	constructor({ decrypter, loadAdministratorById }: AuthMiddleware.Dependencies) {
		this.decrypter = decrypter;
		this.loadByAdministratorById = loadAdministratorById;
	}

	async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
		const { accessToken } = request;
		if (!accessToken) {
			return unauthorized();
		}

		const formatedAccessToken = accessToken.replace("Bearer ", "");
		const token = await this.decrypter.decrypt(formatedAccessToken);
		if (!token) {
			return unauthorized();
		}

		const isExist = await this.loadByAdministratorById.loadById(Number(token.id));
		if (!isExist) {
			return unauthorized();
		}

		return {
			statusCode: 200,
			body: ""
		};
	}
}

export namespace AuthMiddleware {
	export interface Dependencies {
		decrypter: Decrypter;
		loadAdministratorById: LoadAdministratorById;
	}
	export interface Request {
		accessToken?: string;
	}
}
