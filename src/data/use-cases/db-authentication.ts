import { Authentication } from "../../domain";
import { LoadAdministratorByNameRepository, HashComparer, Encrypter } from "../protocols";

export class DbAuthentication implements Authentication {
	constructor(
		private readonly loadAdministratorByNameRepository: LoadAdministratorByNameRepository,
		private readonly hashComparer: HashComparer,
		private readonly encrypter: Encrypter
	) {}

	async auth(credentials: Authentication.Params): Promise<Authentication.Result> {
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
