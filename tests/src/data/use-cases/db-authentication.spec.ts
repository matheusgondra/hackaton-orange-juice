import { DbAuthentication, LoadAdministratorByNameRepository } from "../../../../src/data";

const makeLoadAdministratorByNameRepository = (): LoadAdministratorByNameRepository => {
	class LoadAdministratorByNameRepositoryStub implements LoadAdministratorByNameRepository {
		async loadByName(name: string): Promise<LoadAdministratorByNameRepository.Result> {
			return {
				id: 1,
				name: "any_name",
				password: "any_password"
			};
		}
	}
	return new LoadAdministratorByNameRepositoryStub();
};

interface SutTypes {
	sut: DbAuthentication;
	loadAdministratorByNameRepositoryStub: LoadAdministratorByNameRepository;
}

const makeSut = (): SutTypes => {
	const loadAdministratorByNameRepositoryStub = makeLoadAdministratorByNameRepository();
	const sut = new DbAuthentication({ loadAdministratorByNameRepository: loadAdministratorByNameRepositoryStub });
	return {
		sut,
		loadAdministratorByNameRepositoryStub
	};
};

describe("DbAuthentication", () => {
	it("Should call loadAdministratorByNameRepository with correct value", async () => {
		const { sut, loadAdministratorByNameRepositoryStub } = makeSut();
		const loadByNameSpy = jest.spyOn(loadAdministratorByNameRepositoryStub, "loadByName");
		await sut.auth({ password: "any_password" });
		expect(loadByNameSpy).toHaveBeenCalledWith("Administrador");
	});
});
