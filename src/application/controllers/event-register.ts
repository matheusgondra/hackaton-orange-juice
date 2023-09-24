import { Validation } from "../helpers";
import { Controller, HttpResponse } from "../protocols";

export class EventRegisterController implements Controller {
	private readonly validation: Validation;

	constructor({ validation }: EventRegisterController.Dependencies) {
		this.validation = validation;
	}

	async handle(request: any): Promise<HttpResponse> {
		this.validation.validate(request);

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
