import { Authentication } from "../../domain";
import { LoadAdministratorByNameRepository } from "../protocols/load-administrator-by-name-repository";

export class DbAuthentication implements Authentication {
	private readonly loadAdministratorByNameRepository: LoadAdministratorByNameRepository;

	constructor({ loadAdministratorByNameRepository: loadAdministratorRepository }: DbAuthentication.Dependecies) {
		this.loadAdministratorByNameRepository = loadAdministratorRepository;
	}

	async auth(credentials: Authentication.Params): Promise<Authentication.Result> {
		const administrator = await this.loadAdministratorByNameRepository.loadByName("Administrador");
		if (!administrator) {
			return null;
		}
		return "";
	}
}

export namespace DbAuthentication {
	export interface Dependecies {
		loadAdministratorByNameRepository: LoadAdministratorByNameRepository;
	}
}
