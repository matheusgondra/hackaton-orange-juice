import { Validation, badRequest } from "../../../../src/application/helpers";
import { EventRegisterController } from "../../../../src/application/controllers";

const makeValitionStub = (): Validation => {
	class ValidationStub implements Validation {
		validate(input: any): Validation.Result {
			return null;
		}
	}
	return new ValidationStub();
};

interface SutTypes {
	sut: EventRegisterController;
	validationStub: Validation;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValitionStub();
	const sut = new EventRegisterController({ validation: validationStub });
	return {
		sut,
		validationStub
	};
};

const makeFakeRequest = () => ({
	name: "any_name",
	date: "any_date",
	hour: "any_hour",
	image: "any_image",
	description: "any_description",
	categories: ["any_category"],
	street: "any_street",
	number: "any_number",
	city: "any_city",
	state: "any_state",
	cep: "any_cep"
});

describe("EventRegisterController", () => {
	it("Should call validation with correct values", async () => {
		const { sut, validationStub } = makeSut();
		const validateSpy = jest.spyOn(validationStub, "validate");
		await sut.handle(makeFakeRequest());
		expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest());
	});

	it("Should return 400 if validation return error", async () => {
		const { sut, validationStub } = makeSut();
		jest.spyOn(validationStub, "validate").mockReturnValueOnce(new Error());
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(badRequest(new Error()));
	});
});
