"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEventRegisterController = void 0;
const controllers_1 = require("../../../application/controllers");
const data_1 = require("../../../data");
const db_1 = require("../../../infra/db");
const validation_1 = require("../../../validation");
const makeEventRegisterController = () => {
    const validations = [
        new validation_1.RequiredFieldValidation("name"),
        new validation_1.RequiredFieldValidation("date"),
        new validation_1.RequiredFieldValidation("hour"),
        new validation_1.RequiredFieldValidation("image"),
        new validation_1.RequiredFieldValidation("description"),
        new validation_1.RequiredFieldValidation("categories"),
        new validation_1.RequiredFieldValidation("street"),
        new validation_1.RequiredFieldValidation("number"),
        new validation_1.RequiredFieldValidation("city"),
        new validation_1.RequiredFieldValidation("state"),
        new validation_1.RequiredFieldValidation("cep")
    ];
    const validation = new validation_1.ValidationComposite(validations);
    const addEventRepository = new db_1.EventCategoryRepository();
    const addEvent = new data_1.DbAddEvent({ addEventRepository });
    return new controllers_1.EventRegisterController({ addEvent, validation });
};
exports.makeEventRegisterController = makeEventRegisterController;
//# sourceMappingURL=event-register-factory.js.map