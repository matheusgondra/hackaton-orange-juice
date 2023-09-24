import { LoadEvents } from "../../domain";
import { serverError, success } from "../helpers";
import { Controller, HttpResponse } from "../protocols";

export class LoadEventsController implements Controller {
	private readonly loadEvents: LoadEvents;

	constructor({ loadEvents }: LoadEventsController.Dependencies) {
		this.loadEvents = loadEvents;
	}

	async handle(): Promise<HttpResponse> {
		try {
			const events = await this.loadEvents.load();
			return success(events);
		} catch (error) {
			return serverError(error as Error);
		}
	}
}

export namespace LoadEventsController {
	export interface Dependencies {
		loadEvents: LoadEvents;
	}
}
