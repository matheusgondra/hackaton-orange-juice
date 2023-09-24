import { LoadEvents } from "../../domain";
import { Controller, HttpResponse } from "../protocols";

export class LoadEventsController implements Controller {
	private readonly loadEvents: LoadEvents;

	constructor({ loadEvents }: LoadEventsController.Dependencies) {
		this.loadEvents = loadEvents;
	}

	async handle(): Promise<HttpResponse> {
		await this.loadEvents.load();

		return {
			statusCode: 200,
			body: ""
		};
	}
}

export namespace LoadEventsController {
	export interface Dependencies {
		loadEvents: LoadEvents;
	}
}
