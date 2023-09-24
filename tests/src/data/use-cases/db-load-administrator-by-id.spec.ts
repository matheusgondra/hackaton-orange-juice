import { DbLoadAdministratorById, LoadAdministratorByIdRepository } from "../../../../src/data";

const makeLoadAdministratorByIdRepository = (): LoadAdministratorByIdRepository => {
	class LoadAdministratorByIdRepositoryStub implements LoadAdministratorByIdRepository {
		async loadById(id: number): Promise<LoadAdministratorByIdRepository.Result> {
			return {
				id: 1,
				name: "Administrador",
				password: "hashed_password"
			};
		}
	}
	return new LoadAdministratorByIdRepositoryStub();
};

interface SutTypes {
	sut: DbLoadAdministratorById;
	loadAdministratorByIdRepositoryStub: LoadAdministratorByIdRepository;
}

const makeSut = (): SutTypes => {
	const loadAdministratorByIdRepositoryStub = makeLoadAdministratorByIdRepository();
	const sut = new DbLoadAdministratorById({ loadAdministratorByIdRepository: loadAdministratorByIdRepositoryStub });
	return {
		sut,
		loadAdministratorByIdRepositoryStub
	};
};

describe("DbLoadAdministratorById", () => {
	it("Should call loadAdministratorByIdRepository with correct value", async () => {
		const { sut, loadAdministratorByIdRepositoryStub } = makeSut();
		const loadByIdSpy = jest.spyOn(loadAdministratorByIdRepositoryStub, "loadById");
		await sut.loadById(1);
		expect(loadByIdSpy).toBeCalledWith(1);
	});

	it("Should throw if loadAdministratorByIdRepository throws", async () => {
		const { sut, loadAdministratorByIdRepositoryStub } = makeSut();
		jest.spyOn(loadAdministratorByIdRepositoryStub, "loadById").mockRejectedValueOnce(new Error());
		const promise = sut.loadById(1);
		await expect(promise).rejects.toThrow();
	});

	it("Should return null if loadAdministratorByIdRepository returns null", async () => {
		const { sut, loadAdministratorByIdRepositoryStub } = makeSut();
		jest.spyOn(loadAdministratorByIdRepositoryStub, "loadById").mockResolvedValueOnce(null);
		const administrator = await sut.loadById(1);
		expect(administrator).toBeNull();
	});

	it("Should return an administrator on success", async () => {
		const { sut } = makeSut();
		const administrator = await sut.loadById(1);
		expect(administrator).toEqual({
			id: 1,
			name: "Administrador",
			password: "hashed_password"
		});
	});
});
