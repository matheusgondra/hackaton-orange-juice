import { unauthorized } from "../../../../src/application/helpers";
import { AuthMiddleware } from "../../../../src/application/middlewares";
import { Decrypter } from "../../../../src/data";
import { LoadAdministratorById } from "../../../../src/domain";

const makeDecrypterStub = (): Decrypter => {
	interface IDecrypt {
		id: string;
	}
	class DecrypterStub implements Decrypter {
		async decrypt(cipherText: string): Promise<IDecrypt> {
			return { id: "1" };
		}
	}
	return new DecrypterStub();
};

const makeLoadAdministratorByIdStub = (): LoadAdministratorById => {
	class LoadAdministratorByIdStub implements LoadAdministratorById {
		async loadById(id: number): Promise<LoadAdministratorById.Result> {
			return {
				id: 1,
				name: "Administrador",
				password: "any_password"
			};
		}
	}
	return new LoadAdministratorByIdStub();
};

interface SutTypes {
	sut: AuthMiddleware;
	decrypterStub: Decrypter;
	loadAdministratorByIdStub: LoadAdministratorById;
}

const makeSut = (): SutTypes => {
	const decrypterStub = makeDecrypterStub();
	const loadAdministratorByIdStub = makeLoadAdministratorByIdStub();
	const sut = new AuthMiddleware({ decrypter: decrypterStub, loadAdministratorById: loadAdministratorByIdStub });
	return {
		sut,
		decrypterStub,
		loadAdministratorByIdStub
	};
};

describe("AuthMiddleware", () => {
	it("Should return 401 if no access-token exists in headers", async () => {
		const { sut } = makeSut();
		const request = {};
		const httpResponse = await sut.handle(request);
		expect(httpResponse).toEqual(unauthorized());
	});

	it("Should call decrypter with correct value", async () => {
		const { sut, decrypterStub } = makeSut();
		const decryptSpy = jest.spyOn(decrypterStub, "decrypt");
		const request = {
			accessToken: "any_token"
		};
		await sut.handle(request);
		expect(decryptSpy).toBeCalledWith("any_token");
	});

	it("Should return 401 if decrypter returns null", async () => {
		const { sut, decrypterStub } = makeSut();
		jest.spyOn(decrypterStub, "decrypt").mockResolvedValueOnce(null);
		const request = {
			accessToken: "any_token"
		};
		const httpResponse = await sut.handle(request);
		expect(httpResponse).toEqual(unauthorized());
	});

	it("Should call loadAdministratorById with correct value", async () => {
		const { sut, loadAdministratorByIdStub } = makeSut();
		const loadByIdSpy = jest.spyOn(loadAdministratorByIdStub, "loadById");
		const request = {
			accessToken: "any_token"
		};
		await sut.handle(request);
		expect(loadByIdSpy).toBeCalledWith(1);
	});

	it("Should return 401 if loadAdministratorById returns null", async () => {
		const { sut, loadAdministratorByIdStub } = makeSut();
		jest.spyOn(loadAdministratorByIdStub, "loadById").mockResolvedValueOnce(null);
		const request = {
			accessToken: "any_token"
		};
		const httpResponse = await sut.handle(request);
		expect(httpResponse).toEqual(unauthorized());
	});
});
