import { LoadAdministratorByNameRepository } from "../../../data";
import { db } from "./prisma";

export class AdministratorRepository implements LoadAdministratorByNameRepository {
	async loadByName(name: string): Promise<LoadAdministratorByNameRepository.Result> {
		const administrator = await db.administrator.findUnique({ where: { name } });
		return administrator;
	}
}
