export interface HashComparer {
	compare(values: HashComparer.Params): Promise<HashComparer.Result>;
}

export namespace HashComparer {
	export type Params = {
		value: string;
		hash: string;
	};

	export type Result = boolean;
}
