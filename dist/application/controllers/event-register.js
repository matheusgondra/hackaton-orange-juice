"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRegisterController = void 0;
const helpers_1 = require("../helpers");
class EventRegisterController {
    constructor({ validation, addEvent }) {
        this.validation = validation;
        this.addEvent = addEvent;
    }
    async handle(request) {
        const error = this.validation.validate(request);
        if (error) {
            return (0, helpers_1.badRequest)(error);
        }
        const newEvent = await this.addEvent.add(request);
        if (!newEvent) {
            return (0, helpers_1.conflict)();
        }
        return (0, helpers_1.noContent)();
    }
}
exports.EventRegisterController = EventRegisterController;
//# sourceMappingURL=event-register.js.map