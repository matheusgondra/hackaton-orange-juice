import { LoadAdministratorById } from "../../domain";
import { LoadAdministratorByIdRepository } from "../protocols";

export class DbLoadAdministratorById implements LoadAdministratorById {
	constructor(private readonly loadAdministratorByIdRepository: LoadAdministratorByIdRepository) {}

	async loadById(id: number): Promise<LoadAdministratorById.Result> {
		const administrator = await this.loadAdministratorByIdRepository.loadById(id);
		return administrator;
	}
}
