import { LoadEvents } from "../../domain";
import { serverError, success } from "../helpers";
import { Controller, HttpResponse } from "../protocols";

export class LoadEventsController implements Controller {
	constructor(private readonly loadEvents: LoadEvents) {}

	async handle(): Promise<HttpResponse> {
		try {
			const events = await this.loadEvents.load();
			return success(events);
		} catch (error) {
			return serverError(error as Error);
		}
	}
}
