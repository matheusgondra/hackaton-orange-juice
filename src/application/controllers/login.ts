import { Validation } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class LoginController implements Controller {
	private readonly validation: Validation;

	constructor({ validation }: LoginController.Dependecies) {
		this.validation = validation;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		this.validation.validate(httpRequest);

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
