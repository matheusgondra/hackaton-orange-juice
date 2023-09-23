import { Authentication } from "../../domain";
import { LoadAdministratorByNameRepository, HashComparer } from "../protocols";

export class DbAuthentication implements Authentication {
	private readonly loadAdministratorByNameRepository: LoadAdministratorByNameRepository;
	private readonly hashComparer: HashComparer;

	constructor({ loadAdministratorByNameRepository, hashComparer }: DbAuthentication.Dependecies) {
		this.loadAdministratorByNameRepository = loadAdministratorByNameRepository;
		this.hashComparer = hashComparer;
	}

	async auth(credentials: Authentication.Params): Promise<Authentication.Result> {
		const administrator = await this.loadAdministratorByNameRepository.loadByName("Administrador");
		if (!administrator) {
			return null;
		}

		const { password } = credentials;
		await this.hashComparer.compare({ value: password, hash: administrator.password });

		return "";
	}
}

export namespace DbAuthentication {
	export interface Dependecies {
		loadAdministratorByNameRepository: LoadAdministratorByNameRepository;
		hashComparer: HashComparer;
	}
}
