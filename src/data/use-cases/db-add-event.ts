import { AddEvent } from "../../domain";
import { AddEventRepository } from "../protocols";

export class DbAddEvent implements AddEvent {
	private readonly addEventRepository: AddEventRepository;

	constructor({ addEventRepository }: DbAddEvent.Dependencies) {
		this.addEventRepository = addEventRepository;
	}

	async add(event: AddEvent.Params): Promise<AddEvent.Result> {
		const newEvent = await this.addEventRepository.add(event);
		return newEvent;
	}
}

export namespace DbAddEvent {
	export interface Dependencies {
		addEventRepository: AddEventRepository;
	}
}
