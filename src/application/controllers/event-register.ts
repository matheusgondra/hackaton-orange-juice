import { AddEvent } from "../../domain";
import { Validation, badRequest, conflict, created, noContent, success } from "../helpers";
import { Controller, HttpResponse } from "../protocols";

export class EventRegisterController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly addEvent: AddEvent
	) {}

	async handle(request: EventRegisterController.Request): Promise<HttpResponse> {
		const error = this.validation.validate(request);
		if (error) {
			return badRequest(error);
		}

		const newEvent = await this.addEvent.add(request);
		if (!newEvent) {
			return conflict();
		}
		return noContent();
	}
}

export namespace EventRegisterController {
	export interface Request {
		name: string;
		date: Date;
		hour: string;
		image: string;
		description: string;
		categories: string[];
		street: string;
		number: number;
		city: string;
		state: string;
		cep: string;
	}
}
