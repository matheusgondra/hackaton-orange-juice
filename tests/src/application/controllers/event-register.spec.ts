import { Validation, badRequest, conflict, created } from "../../../../src/application/helpers";
import { EventRegisterController } from "../../../../src/application/controllers";
import { AddEvent } from "../../../../src/domain";

const makeValitionStub = (): Validation => {
	class ValidationStub implements Validation {
		validate(input: any): Validation.Result {
			return null;
		}
	}
	return new ValidationStub();
};

const makeAddEventStub = (): AddEvent => {
	class AddEventStub implements AddEvent {
		async add(event: AddEvent.Params): Promise<AddEvent.Result> {
			return {
				id: 1,
				name: "any_name",
				date: new Date("2021-01-01"),
				hour: "any_hour",
				image: "any_image",
				description: "any_description",
				categories: ["any_category", "other_category"],
				street: "any_street",
				number: 1,
				city: "any_city",
				state: "any_state",
				cep: "any_cep"
			};
		}
	}
	return new AddEventStub();
};

interface SutTypes {
	sut: EventRegisterController;
	validationStub: Validation;
	addEventStub: AddEvent;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValitionStub();
	const addEventStub = makeAddEventStub();
	const sut = new EventRegisterController({ validation: validationStub, addEvent: addEventStub });
	return {
		sut,
		validationStub,
		addEventStub
	};
};

const makeFakeRequest = () => ({
	name: "any_name",
	date: new Date("2021-01-01"),
	hour: "any_hour",
	image: "any_image",
	description: "any_description",
	categories: ["any_category", "other_category"],
	street: "any_street",
	number: 1,
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

	it("Should call addEvent with correct values", async () => {
		const { sut, addEventStub } = makeSut();
		const addSpy = jest.spyOn(addEventStub, "add");
		await sut.handle(makeFakeRequest());
		expect(addSpy).toHaveBeenCalledWith(makeFakeRequest());
	});

	it("Should return 409 if addEvent return null", async () => {
		const { sut, addEventStub } = makeSut();
		jest.spyOn(addEventStub, "add").mockResolvedValueOnce(null);
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(conflict());
	});

	it("Should return 201 if addEvent return an event", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(created({ ...makeFakeRequest(), id: expect.any(Number) }));
	});
});
