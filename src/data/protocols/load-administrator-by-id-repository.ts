import { AdministratorModel } from "../../domain";

export interface LoadAdministratorByIdRepository {
	loadById(id: number): Promise<LoadAdministratorByIdRepository.Result>;
}

export namespace LoadAdministratorByIdRepository {
	export type Result = AdministratorModel | null;
}
