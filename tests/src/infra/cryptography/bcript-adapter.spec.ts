import { BcryptAdapter } from "../../../../src/infra/cryptography";
import bcrypt from "bcrypt";

jest.mock("bcrypt", () => ({
	async compare(): Promise<boolean> {
		return true;
	}
}));

describe("Bcrypt Adapter", () => {
	it("Should call compare with correct values", () => {
		const sut = new BcryptAdapter({ salt: 12 });
		const compareSpy = jest.spyOn(bcrypt, "compare");
		sut.compare({ value: "any_value", hash: "any_hash" });
		expect(compareSpy).toHaveBeenCalledWith("any_value", "any_hash");
	});
});
