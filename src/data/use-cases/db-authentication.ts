import { Authentication } from "../../domain";
import { LoadAdministratorByNameRepository, HashComparer, Encrypter } from "../protocols";

export class DbAuthentication implements Authentication {
	private readonly loadAdministratorByNameRepository: LoadAdministratorByNameRepository;
	private readonly hashComparer: HashComparer;
	private readonly encrypter: Encrypter;

	constructor({ loadAdministratorByNameRepository, hashComparer, encrypter }: DbAuthentication.Dependecies) {
		this.loadAdministratorByNameRepository = loadAdministratorByNameRepository;
		this.hashComparer = hashComparer;
		this.encrypter = encrypter;
	}

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

		await this.encrypter.encrypt(String(administrator.id));

		return "";
	}
}

export namespace DbAuthentication {
	export interface Dependecies {
		loadAdministratorByNameRepository: LoadAdministratorByNameRepository;
		hashComparer: HashComparer;
		encrypter: Encrypter;
	}
}
