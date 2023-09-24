import { LoadAdministratorByIdRepository, LoadAdministratorByNameRepository } from "../../../data";
import { db } from "./prisma";

export class AdministratorRepository implements LoadAdministratorByNameRepository, LoadAdministratorByIdRepository {
	async loadByName(name: string): Promise<LoadAdministratorByNameRepository.Result> {
		const administrator = await db.administrator.findUnique({ where: { name } });
		return administrator;
	}

	async loadById(id: number): Promise<LoadAdministratorByIdRepository.Result> {
		const administrator = await db.administrator.findUnique({ where: { id } });
		return administrator;
	}
}
