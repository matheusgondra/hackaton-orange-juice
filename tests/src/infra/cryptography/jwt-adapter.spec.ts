import { JwtAdapter } from "../../../../src/infra/cryptography";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
	async sign(): Promise<string> {
		return "any_token";
	}
}));

describe("Jwt Adapter", () => {
	it("Should call sign with correct values", () => {
		const sut = new JwtAdapter("secret");
		const signSpy = jest.spyOn(jwt, "sign");
		sut.encrypt("any_id");
		expect(signSpy).toBeCalledWith({ id: "any_id" }, "secret");
	});
});
