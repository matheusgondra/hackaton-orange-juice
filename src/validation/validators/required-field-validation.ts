import { MissignParamError } from "../../application/errors";
import { Validation } from "../../application/helpers";

export class RequiredFieldValidation implements Validation {
	constructor(private readonly fieldName: string) {}

	validate(input: any): Validation.Result {
		if (!input[this.fieldName]) {
			return new MissignParamError(this.fieldName);
		}
		return null;
	}
}
