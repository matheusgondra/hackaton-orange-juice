export interface LoadEvents {
	load(): Promise<LoadEvents.Result>;
}

export namespace LoadEvents {
	export type Result = {
		id: number;
		name: string;
		date: Date;
		hour: string;
		image: string;
		description: string;
		street: string;
		number: number;
		city: string;
		state: string;
		zip_code: string;
		categories: string[];
	}[];
}
