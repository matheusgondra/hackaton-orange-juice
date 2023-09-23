import { HashComparer } from "../../data";
import bcrypt from "bcrypt";

export class BcryptAdapter implements HashComparer {
	private readonly salt: number;

	constructor({ salt }: BcryptAdapter.Dependencies) {
		this.salt = salt;
	}

	async compare(values: HashComparer.Params): Promise<HashComparer.Result> {
		await bcrypt.compare(values.value, values.hash);
		return true;
	}
}

export namespace BcryptAdapter {
	export interface Dependencies {
		salt: number;
	}
}
