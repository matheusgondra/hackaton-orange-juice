import { MissignParamError } from "../../application/errors";
import { Validation } from "../../application/helpers";

export class RequiredFieldValidation implements Validation {
	private readonly fieldName: string;

	constructor(fieldName: string) {
		this.fieldName = fieldName;
	}

	validate(input: any): Validation.Result {
		if (!input[this.fieldName]) {
			return new MissignParamError(this.fieldName);
		}
		return null;
	}
}
