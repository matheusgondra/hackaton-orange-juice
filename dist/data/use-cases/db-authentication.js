"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbAuthentication = void 0;
class DbAuthentication {
    constructor({ loadAdministratorByNameRepository, hashComparer, encrypter }) {
        this.loadAdministratorByNameRepository = loadAdministratorByNameRepository;
        this.hashComparer = hashComparer;
        this.encrypter = encrypter;
    }
    async auth(credentials) {
        const administrator = await this.loadAdministratorByNameRepository.loadByName("Administrador");
        if (!administrator) {
            return null;
        }
        const { password } = credentials;
        const isValid = await this.hashComparer.compare({ value: password, hash: administrator.password });
        if (!isValid) {
            return null;
        }
        const accessToken = await this.encrypter.encrypt(String(administrator.id));
        return accessToken;
    }
}
exports.DbAuthentication = DbAuthentication;
//# sourceMappingURL=db-authentication.js.map