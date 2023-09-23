import { DbAuthentication, HashComparer, LoadAdministratorByNameRepository } from "../../../../src/data";

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

const makeHashComparerStub = (): HashComparer => {
	class HashComparerStub implements HashComparer {
		async compare(values: HashComparer.Params): Promise<HashComparer.Result> {
			return true;
		}
	}
	return new HashComparerStub();
};

interface SutTypes {
	sut: DbAuthentication;
	loadAdministratorByNameRepositoryStub: LoadAdministratorByNameRepository;
	hashComparerStub: HashComparer;
}

const makeSut = (): SutTypes => {
	const loadAdministratorByNameRepositoryStub = makeLoadAdministratorByNameRepository();
	const hashComparerStub = makeHashComparerStub();
	const sut = new DbAuthentication({
		loadAdministratorByNameRepository: loadAdministratorByNameRepositoryStub,
		hashComparer: hashComparerStub
	});
	return {
		sut,
		loadAdministratorByNameRepositoryStub,
		hashComparerStub
	};
};

describe("DbAuthentication", () => {
	it("Should call loadAdministratorByNameRepository with correct value", async () => {
		const { sut, loadAdministratorByNameRepositoryStub } = makeSut();
		const loadByNameSpy = jest.spyOn(loadAdministratorByNameRepositoryStub, "loadByName");
		await sut.auth({ password: "any_password" });
		expect(loadByNameSpy).toHaveBeenCalledWith("Administrador");
	});

	it("Should throw if loadAdministratorByNameRepository throws", async () => {
		const { sut, loadAdministratorByNameRepositoryStub } = makeSut();
		jest.spyOn(loadAdministratorByNameRepositoryStub, "loadByName").mockRejectedValueOnce(new Error());
		const promise = sut.auth({ password: "any_password" });
		await expect(promise).rejects.toThrow();
	});

	it("Should return null if loadAdministratorByNameRepository returns null", async () => {
		const { sut, loadAdministratorByNameRepositoryStub } = makeSut();
		jest.spyOn(loadAdministratorByNameRepositoryStub, "loadByName").mockResolvedValueOnce(null);
		const accessToken = await sut.auth({ password: "any_password" });
		expect(accessToken).toBeNull();
	});

	it("Should call hashComparer with correct values", async () => {
		const { sut, hashComparerStub } = makeSut();
		const compareSpy = jest.spyOn(hashComparerStub, "compare");
		await sut.auth({ password: "any_password" });
		expect(compareSpy).toHaveBeenCalledWith({
			value: "any_password",
			hash: "any_password"
		});
	});

	it("Should return null if hashComparer returns false", async () => {
		const { sut, hashComparerStub } = makeSut();
		jest.spyOn(hashComparerStub, "compare").mockResolvedValueOnce(false);
		const accessToken = await sut.auth({ password: "any_password" });
		expect(accessToken).toBeNull();
	});

	it("Should throw if hashComparer throws", async () => {
		const { sut, hashComparerStub } = makeSut();
		jest.spyOn(hashComparerStub, "compare").mockRejectedValueOnce(new Error());
		const promise = sut.auth({ password: "any_password" });
		await expect(promise).rejects.toThrow();
	});
});
