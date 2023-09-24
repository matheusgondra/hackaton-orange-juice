import { LoadAdministratorById } from "../../domain";
import { LoadAdministratorByIdRepository } from "../protocols";

export class DbLoadAdministratorById implements LoadAdministratorById {
	private readonly loadAdministratorByIdRepository: LoadAdministratorByIdRepository;

	constructor({ loadAdministratorByIdRepository }: DbLoadAdministratorById.Dependencies) {
		this.loadAdministratorByIdRepository = loadAdministratorByIdRepository;
	}
	async loadById(id: number): Promise<LoadAdministratorById.Result> {
		const administrator = await this.loadAdministratorByIdRepository.loadById(id);
		return administrator;
	}
}

export namespace DbLoadAdministratorById {
	export interface Dependencies {
		loadAdministratorByIdRepository: LoadAdministratorByIdRepository;
	}
}
