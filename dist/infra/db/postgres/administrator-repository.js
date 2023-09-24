"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministratorRepository = void 0;
const prisma_1 = require("./prisma");
class AdministratorRepository {
    async loadByName(name) {
        const administrator = await prisma_1.db.administrator.findUnique({ where: { name } });
        return administrator;
    }
    async loadById(id) {
        const administrator = await prisma_1.db.administrator.findUnique({ where: { id } });
        return administrator;
    }
}
exports.AdministratorRepository = AdministratorRepository;
//# sourceMappingURL=administrator-repository.js.map