import { Validation } from "../../../../application/helpers";
import { RequiredFieldValidation, ValidationComposite } from "../../../../validation";

export const makeEventRegisterValidation = (): ValidationComposite => {
	const validations: Validation[] = [];
	const requiredFields = [
		"name",
		"date",
		"hour",
		"image",
		"description",
		"categories",
		"street",
		"number",
		"city",
		"state",
		"cep"
	];
	for (const field of requiredFields) {
		validations.push(new RequiredFieldValidation(field));
	}

	return new ValidationComposite(validations);
};
