import { Validation, badRequest } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class LoginController implements Controller {
	private readonly validation: Validation;

	constructor({ validation }: LoginController.Dependecies) {
		this.validation = validation;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = this.validation.validate(httpRequest);
		if (error) {
			return badRequest(error);
		}

		return {
			statusCode: 200,
			body: {}
		};
	}
}

export namespace LoginController {
	export interface Dependecies {
		validation: Validation;
	}
}
