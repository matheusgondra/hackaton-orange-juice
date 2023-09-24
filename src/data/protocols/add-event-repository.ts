export interface AddEventRepository {
	add: (event: AddEventRepository.Params) => Promise<AddEventRepository.Result>;
}

export namespace AddEventRepository {
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
	export type Result = boolean;
}
