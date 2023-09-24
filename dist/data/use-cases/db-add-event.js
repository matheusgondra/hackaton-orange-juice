"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbAddEvent = void 0;
class DbAddEvent {
    constructor({ addEventRepository }) {
        this.addEventRepository = addEventRepository;
    }
    async add(event) {
        const newEvent = await this.addEventRepository.add(event);
        return newEvent;
    }
}
exports.DbAddEvent = DbAddEvent;
//# sourceMappingURL=db-add-event.js.map