import { DbLoadAdministratorById, LoadAdministratorByIdRepository } from "../../../../src/data";

describe("DbLoadAdministratorById", () => {
	it("Should call loadAdministratorByIdRepository with correct value", async () => {
		class LoadAdministratorByIdRepositoryStub implements LoadAdministratorByIdRepository {
			async loadById(id: number): Promise<LoadAdministratorByIdRepository.Result> {
				return {
					id: 1,
					name: "Administrador",
					password: "hashed_password"
				};
			}
		}
		const loadAdministratorByIdRepositoryStub = new LoadAdministratorByIdRepositoryStub();
		const sut = new DbLoadAdministratorById({ loadAdministratorByIdRepository: loadAdministratorByIdRepositoryStub });
		const loadByIdSpy = jest.spyOn(loadAdministratorByIdRepositoryStub, "loadById");
		await sut.loadById(1);
		expect(loadByIdSpy).toBeCalledWith(1);
	});
});
