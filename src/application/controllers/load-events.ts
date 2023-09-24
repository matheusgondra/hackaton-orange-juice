import { LoadEvents } from "../../domain";
import { success } from "../helpers";
import { Controller, HttpResponse } from "../protocols";

export class LoadEventsController implements Controller {
	private readonly loadEvents: LoadEvents;

	constructor({ loadEvents }: LoadEventsController.Dependencies) {
		this.loadEvents = loadEvents;
	}

	async handle(): Promise<HttpResponse> {
		const events = await this.loadEvents.load();
		return success(events);
	}
}

export namespace LoadEventsController {
	export interface Dependencies {
		loadEvents: LoadEvents;
	}
}
