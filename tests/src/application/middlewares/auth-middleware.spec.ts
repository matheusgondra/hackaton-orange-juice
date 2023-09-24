import { unauthorized } from "../../../../src/application/helpers";
import { AuthMiddleware } from "../../../../src/application/middlewares";
import { Decrypter } from "../../../../src/data";

const makeDecrypterStub = (): Decrypter => {
	class DecrypterStub implements Decrypter {
		async decrypt(cipherText: string): Promise<string> {
			return "token";
		}
	}
	return new DecrypterStub();
};

interface SutTypes {
	sut: AuthMiddleware;
	decrypterStub: Decrypter;
}

const makeSut = (): SutTypes => {
	const decrypterStub = makeDecrypterStub();
	const sut = new AuthMiddleware({ decrypter: decrypterStub });
	return {
		sut,
		decrypterStub
	};
};

describe("AuthMiddleware", () => {
	it("Should return 403 if no access-token exists in headers", async () => {
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

	it("Should return 403 if decrypter returns null", async () => {
		const { sut, decrypterStub } = makeSut();
		jest.spyOn(decrypterStub, "decrypt").mockResolvedValueOnce(null);
		const request = {
			accessToken: "any_token"
		};
		const httpResponse = await sut.handle(request);
		expect(httpResponse).toEqual(unauthorized());
	});
});
