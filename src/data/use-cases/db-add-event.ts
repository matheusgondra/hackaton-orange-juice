import { AddEvent } from "../../domain";
import { AddEventRepository } from "../protocols";

export class DbAddEvent implements AddEvent {
	constructor(private readonly addEventRepository: AddEventRepository) {}

	async add(event: AddEvent.Params): Promise<AddEvent.Result> {
		const newEvent = await this.addEventRepository.add(event);
		return newEvent;
	}
}
