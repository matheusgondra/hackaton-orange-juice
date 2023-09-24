import { JwtAdapter } from "../../../../src/infra/cryptography";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
	async sign(): Promise<string> {
		return "any_token";
	},
	async verify(): Promise<string> {
		return "any_value";
	}
}));

const makeSut = (): JwtAdapter => {
	return new JwtAdapter("secret");
};

describe("Jwt Adapter", () => {
	describe("encrypt()", () => {
		it("Should call sign with correct values", () => {
			const sut = makeSut();
			const signSpy = jest.spyOn(jwt, "sign");
			sut.encrypt("any_id");
			expect(signSpy).toBeCalledWith({ id: "any_id" }, "secret");
		});

		it("Should return a token on sign success", async () => {
			const sut = makeSut();
			const accessToken = await sut.encrypt("any_id");
			expect(accessToken).toBe("any_token");
		});

		it("Should throw if sign throws", async () => {
			const sut = makeSut();
			jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
				throw new Error();
			});
			const promise = sut.encrypt("any_id");
			await expect(promise).rejects.toThrow();
		});
	});

	describe("decrypt()", () => {
		it("Should call verify with correct values", async () => {
			const sut = makeSut();
			const verifySpy = jest.spyOn(jwt, "verify");
			await sut.decrypt("any_token");
			expect(verifySpy).toBeCalledWith("any_token", "secret");
		});

		it("Should throw if verify throws", async () => {
			const sut = makeSut();
			jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
				throw new Error();
			});
			const promise = sut.decrypt("any_token");
			await expect(promise).rejects.toThrow();
		});
	});
});
