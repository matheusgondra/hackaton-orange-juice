import { Validation } from "../../../../src/application/helpers";
import { EventRegisterController } from "../../../../src/application/controllers";

describe("EventRegisterController", () => {
	it("Should call validation with correct values", async () => {
		class ValidationStub implements Validation {
			validate(input: any): Validation.Result {
				return null;
			}
		}
		const validationStub = new ValidationStub();
		const sut = new EventRegisterController({ validation: validationStub });
		const validateSpy = jest.spyOn(validationStub, "validate");
		const request = {
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
		};
		await sut.handle(request);
		expect(validateSpy).toHaveBeenCalledWith(request);
	});
});
