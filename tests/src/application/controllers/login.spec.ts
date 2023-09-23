import { Validation, badRequest } from "../../../../src/application/helpers";
import { LoginController } from "../../../../src/application/controllers";

const makeValidationStub = (): Validation => {
	class ValidationStub implements Validation {
		validate(input: Validation.Params): Validation.Result {
			return null;
		}
	}
	return new ValidationStub();
};

interface SutTypes {
	sut: LoginController;
	validationStub: Validation;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValidationStub();
	const sut = new LoginController({ validation: validationStub });
	return {
		sut,
		validationStub
	};
};

const makeFakeRequest = () => ({
	body: {
		password: "any_password"
	}
});

describe("LoginController", () => {
	it("Should call validation with correct values", async () => {
		const { sut, validationStub } = makeSut();
		const validateSpy = jest.spyOn(validationStub, "validate");
		await sut.handle(makeFakeRequest());
		expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest());
	});

	it("Should return 400 if validation return an error", async () => {
		const { sut, validationStub } = makeSut();
		jest.spyOn(validationStub, "validate").mockReturnValueOnce(new Error());
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(badRequest(new Error()));
	});
});
