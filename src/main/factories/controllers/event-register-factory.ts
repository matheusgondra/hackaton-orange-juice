import { EventRegisterController } from "../../../application/controllers";
import { DbAddEvent } from "../../../data";
import { EventCategoryRepository } from "../../../infra/db";
import { makeEventRegisterValidation } from "../validators";

export const makeEventRegisterController = (): EventRegisterController => {
	const validation = makeEventRegisterValidation();
	const addEventRepository = new EventCategoryRepository();
	const addEvent = new DbAddEvent(addEventRepository);
	return new EventRegisterController(validation, addEvent);
};
