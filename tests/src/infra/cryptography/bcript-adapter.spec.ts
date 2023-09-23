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

	it("Should return true when compare succeeds", async () => {
		const sut = makeSut();
		const isValid = await sut.compare({
			value: "any_value",
			hash: "any_hash"
		});
		expect(isValid).toBe(true);
	});

	it("Should return false when compare fails", async () => {
		const sut = makeSut();
		jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => false);
		const isValid = await sut.compare({
			value: "any_value",
			hash: "any_hash"
		});
		expect(isValid).toBe(false);
	});

	it("Should throw if compare throws", async () => {
		const sut = makeSut();
		jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => {
			throw new Error();
		});
		const promise = sut.compare({
			value: "any_value",
			hash: "any_hash"
		});
		await expect(promise).rejects.toThrow();
	});
});
