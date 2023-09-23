import { DbAuthentication } from "../../../../../src/data";
import { LoadAdministratorByNameRepository } from "../../../../../src/data";

describe("DbAuthentication", () => {
	it("Should call loadAdministratorByNameRepository with correct value", async () => {
		class LoadAdministratorByNameRepositoryStub implements LoadAdministratorByNameRepository {
			async loadByName(name: string): Promise<LoadAdministratorByNameRepository.Result> {
				return {
					id: 1,
					name: "any_name",
					password: "any_password"
				};
			}
		}
		const loadAdministratorByNameRepositoryStub = new LoadAdministratorByNameRepositoryStub();
		const sut = new DbAuthentication({ loadAdministratorByNameRepository: loadAdministratorByNameRepositoryStub });
		const loadByNameSpy = jest.spyOn(loadAdministratorByNameRepositoryStub, "loadByName");
		await sut.auth({ password: "any_password" });
		expect(loadByNameSpy).toHaveBeenCalledWith("Administrador");
	});
});
