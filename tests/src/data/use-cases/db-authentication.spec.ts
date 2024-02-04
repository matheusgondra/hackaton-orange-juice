import { DbAuthentication, Encrypter, HashComparer, LoadAdministratorByNameRepository } from "../../../../src/data";

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

const makeEncrypterStub = (): Encrypter => {
	class EncrypterStub implements Encrypter {
		async encrypt(value: string): Promise<Encrypter.Result> {
			return "any_token";
		}
	}
	return new EncrypterStub();
};

interface SutTypes {
	sut: DbAuthentication;
	loadAdministratorByNameRepositoryStub: LoadAdministratorByNameRepository;
	hashComparerStub: HashComparer;
	encrypterStub: Encrypter;
}

const makeSut = (): SutTypes => {
	const loadAdministratorByNameRepositoryStub = makeLoadAdministratorByNameRepository();
	const hashComparerStub = makeHashComparerStub();
	const encrypterStub = makeEncrypterStub();
	const sut = new DbAuthentication(loadAdministratorByNameRepositoryStub, hashComparerStub, encrypterStub);
	return {
		sut,
		loadAdministratorByNameRepositoryStub,
		hashComparerStub,
		encrypterStub
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

	it("Should call encrypter with correct value", async () => {
		const { sut, encrypterStub } = makeSut();
		const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
		await sut.auth({ password: "any_password" });
		expect(encryptSpy).toHaveBeenCalledWith("1");
	});

	it("Should throw if encrypter throws", async () => {
		const { sut, encrypterStub } = makeSut();
		jest.spyOn(encrypterStub, "encrypt").mockRejectedValueOnce(new Error());
		const promise = sut.auth({ password: "any_password" });
		await expect(promise).rejects.toThrow();
	});

	it("Should return a token on success", async () => {
		const { sut } = makeSut();
		const accessToken = await sut.auth({ password: "any_password" });
		expect(accessToken).toBe("any_token");
	});
});
