export interface AddEvent {
	add: (eventData: AddEvent.Params) => Promise<AddEvent.Result>;
}

export namespace AddEvent {
	export interface Params {
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
	export type Result = {
		id: number;
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
	} | null;
}
