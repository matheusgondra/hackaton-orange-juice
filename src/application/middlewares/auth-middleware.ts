import { Decrypter } from "../../data";
import { LoadAdministratorById } from "../../domain";
import { success, unauthorized } from "../helpers";
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

		const id = Number(token.id);
		const isExist = await this.loadByAdministratorById.loadById(id);
		if (!isExist) {
			return unauthorized();
		}

		return success({ id });
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
