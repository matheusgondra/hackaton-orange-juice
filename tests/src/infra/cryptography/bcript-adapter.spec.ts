import { BcryptAdapter } from "../../../../src/infra/cryptography";
import bcrypt from "bcrypt";

jest.mock("bcrypt", () => ({
	async compare(): Promise<boolean> {
		return true;
	}
}));

const makeSut = (): BcryptAdapter => {
	const salt = 12;
	return new BcryptAdapter({ salt });
};

describe("Bcrypt Adapter", () => {
	it("Should call compare with correct values", () => {
		const sut = makeSut();
		const compareSpy = jest.spyOn(bcrypt, "compare");
		sut.compare({ value: "any_value", hash: "any_hash" });
		expect(compareSpy).toHaveBeenCalledWith("any_value", "any_hash");
	});
});
