import { Validation } from "../../../../src/application/helpers";
import { LoginController } from "../../../../src/application/controllers";

describe("LoginController", () => {
	it("Should call validation with correct values", async () => {
		class ValidationStub implements Validation {
			validate(input: Validation.Params): Validation.Result {
				return null;
			}
		}
		const validationStub = new ValidationStub();
		const sut = new LoginController({ validation: validationStub });
		const validateSpy = jest.spyOn(validationStub, "validate");
		const httpRequest = {
			body: {
				password: "any_password"
			}
		};
		await sut.handle(httpRequest);
		expect(validateSpy).toHaveBeenCalledWith(httpRequest);
	});
});
