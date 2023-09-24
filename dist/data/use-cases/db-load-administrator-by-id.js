"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbLoadAdministratorById = void 0;
class DbLoadAdministratorById {
    constructor({ loadAdministratorByIdRepository }) {
        this.loadAdministratorByIdRepository = loadAdministratorByIdRepository;
    }
    async loadById(id) {
        const administrator = await this.loadAdministratorByIdRepository.loadById(id);
        return administrator;
    }
}
exports.DbLoadAdministratorById = DbLoadAdministratorById;
//# sourceMappingURL=db-load-administrator-by-id.js.map