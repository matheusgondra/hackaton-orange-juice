import { AdministratorModel } from "../models/administrator";

export interface LoadAdministratorById {
	loadById(id: number): Promise<LoadAdministratorById.Result>;
}

export namespace LoadAdministratorById {
	export type Result = AdministratorModel | null;
}
