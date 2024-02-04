import { Authentication } from "../../domain";
import { Validation, badRequest, serverError, success, unauthorized } from "../helpers";
import { Controller, HttpResponse } from "../protocols";

export class LoginController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly authentication: Authentication
	) {}

	async handle(httpRequest: LoginController.Request): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(httpRequest);
			if (error) {
				return badRequest(error);
			}

			const { password } = httpRequest;
			const accessToken = await this.authentication.auth({ password });
			if (!accessToken) {
				return unauthorized();
			}

			return success({ accessToken });
		} catch (error) {
			return serverError(error as Error);
		}
	}
}

export namespace LoginController {
	export interface Request {
		password: string;
	}
}
