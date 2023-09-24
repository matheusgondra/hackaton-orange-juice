import { AddEvent } from "../../domain";
import { Validation, badRequest, conflict, created, success } from "../helpers";
import { Controller, HttpResponse } from "../protocols";

export class EventRegisterController implements Controller {
	private readonly validation: Validation;
	private readonly addEvent: AddEvent;

	constructor({ validation, addEvent }: EventRegisterController.Dependencies) {
		this.validation = validation;
		this.addEvent = addEvent;
	}

	async handle(request: EventRegisterController.Request): Promise<HttpResponse> {
		const error = this.validation.validate(request);
		if (error) {
			return badRequest(error);
		}

		const newEvent = await this.addEvent.add(request);
		if (!newEvent) {
			return conflict();
		}
		return created(newEvent);
	}
}

export namespace EventRegisterController {
	export interface Dependencies {
		validation: Validation;
		addEvent: AddEvent;
	}
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
