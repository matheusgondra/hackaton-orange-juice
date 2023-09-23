import { AdministratorModel } from "../../domain";

export interface LoadAdministratorByNameRepository {
	loadByName(name: string): Promise<LoadAdministratorByNameRepository.Result>;
}

export namespace LoadAdministratorByNameRepository {
	export type Result = AdministratorModel | null;
}
