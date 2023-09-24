import { EventRegisterController } from "../../../application/controllers";
import { DbAddEvent } from "../../../data";
import { EventCategoryRepository } from "../../../infra/db";
import { RequiredFieldValidation, ValidationComposite } from "../../../validation";

export const makeEventRegisterController = (): EventRegisterController => {
	const validations = [
		new RequiredFieldValidation("name"),
		new RequiredFieldValidation("date"),
		new RequiredFieldValidation("hour"),
		new RequiredFieldValidation("image"),
		new RequiredFieldValidation("description"),
		new RequiredFieldValidation("categories"),
		new RequiredFieldValidation("street"),
		new RequiredFieldValidation("number"),
		new RequiredFieldValidation("city"),
		new RequiredFieldValidation("state"),
		new RequiredFieldValidation("cep")
	];
	const validation = new ValidationComposite(validations);
	const addEventRepository = new EventCategoryRepository();
	const addEvent = new DbAddEvent({ addEventRepository });
	return new EventRegisterController({ addEvent, validation });
};
