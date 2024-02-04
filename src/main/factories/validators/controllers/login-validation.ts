import { Validation } from "../../../../application/helpers";
import { RequiredFieldValidation, ValidationComposite } from "../../../../validation";

export const makeLoginValidation = (): ValidationComposite => {
	const validations: Validation[] = [];
	validations.push(new RequiredFieldValidation("password"));
	return new ValidationComposite(validations);
};
