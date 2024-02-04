import { HashComparer } from "../../data";
import bcrypt from "bcrypt";

export class BcryptAdapter implements HashComparer {
	constructor(private readonly salt: number) {}

	async compare(values: HashComparer.Params): Promise<HashComparer.Result> {
		const isValid = await bcrypt.compare(values.value, values.hash);
		return isValid;
	}
}
