"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredFieldValidation = void 0;
const errors_1 = require("../../application/errors");
class RequiredFieldValidation {
    constructor(fieldName) {
        this.fieldName = fieldName;
    }
    validate(input) {
        if (!input[this.fieldName]) {
            return new errors_1.MissignParamError(this.fieldName);
        }
        return null;
    }
}
exports.RequiredFieldValidation = RequiredFieldValidation;
//# sourceMappingURL=required-field-validation.js.map