import { JwtAdapter } from "../../../../src/infra/cryptography";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
	async sign(): Promise<string> {
		return "any_token";
	}
}));

const makeSut = (): JwtAdapter => {
	return new JwtAdapter("secret");
};

describe("Jwt Adapter", () => {
	it("Should call sign with correct values", () => {
		const sut = makeSut();
		const signSpy = jest.spyOn(jwt, "sign");
		sut.encrypt("any_id");
		expect(signSpy).toBeCalledWith({ id: "any_id" }, "secret");
	});
});
