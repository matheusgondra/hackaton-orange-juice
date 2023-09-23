import { Authentication } from "../../domain";
import { Validation, badRequest } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class LoginController implements Controller {
	private readonly validation: Validation;
	private readonly authentication: Authentication;

	constructor({ validation, authentication }: LoginController.Dependecies) {
		this.validation = validation;
		this.authentication = authentication;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = this.validation.validate(httpRequest);
		if (error) {
			return badRequest(error);
		}

		const { password } = httpRequest.body;
		await this.authentication.auth({ password });

		return {
			statusCode: 200,
			body: {}
		};
	}
}

export namespace LoginController {
	export interface Dependecies {
		validation: Validation;
		authentication: Authentication;
	}
}
