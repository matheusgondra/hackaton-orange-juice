import { Validation } from "../../application/helpers";

export class ValidationComposite implements Validation {
	private readonly validations: Validation[] = [];

	constructor(validations: Validation[]) {
		this.validations = validations;
	}

	validate(input: Validation.Params): Validation.Result {
		for (const validation of this.validations) {
			const error = validation.validate(input);
			if (error) {
				return error;
			}
		}
		return null;
	}
}
