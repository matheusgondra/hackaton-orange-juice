"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadEventsController = void 0;
const helpers_1 = require("../helpers");
class LoadEventsController {
    constructor({ loadEvents }) {
        this.loadEvents = loadEvents;
    }
    async handle() {
        try {
            const events = await this.loadEvents.load();
            return (0, helpers_1.success)(events);
        }
        catch (error) {
            return (0, helpers_1.serverError)(error);
        }
    }
}
exports.LoadEventsController = LoadEventsController;
//# sourceMappingURL=load-events.js.map