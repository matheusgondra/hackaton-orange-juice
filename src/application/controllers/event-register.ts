import { Validation, badRequest } from "../helpers";
import { Controller, HttpResponse } from "../protocols";

export class EventRegisterController implements Controller {
	private readonly validation: Validation;

	constructor({ validation }: EventRegisterController.Dependencies) {
		this.validation = validation;
	}

	async handle(request: any): Promise<HttpResponse> {
		const error = this.validation.validate(request);
		if (error) {
			return badRequest(error);
		}

		return {
			statusCode: 200,
			body: {}
		};
	}
}

export namespace EventRegisterController {
	export interface Dependencies {
		validation: Validation;
	}
}
