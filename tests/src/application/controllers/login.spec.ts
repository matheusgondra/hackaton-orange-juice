import { Validation, badRequest } from "../../../../src/application/helpers";
import { Authentication } from "../../../../src/domain";
import { LoginController } from "../../../../src/application/controllers";

const makeValidationStub = (): Validation => {
	class ValidationStub implements Validation {
		validate(input: Validation.Params): Validation.Result {
			return null;
		}
	}
	return new ValidationStub();
};

const makeAuthenticationStub = (): Authentication => {
	class AuthenticationStub implements Authentication {
		async auth(credentials: Authentication.Params): Promise<Authentication.Result> {
			return "access_token";
		}
	}
	return new AuthenticationStub();
};

interface SutTypes {
	sut: LoginController;
	validationStub: Validation;
	authenticationStub: Authentication;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValidationStub();
	const authenticationStub = makeAuthenticationStub();
	const sut = new LoginController({ validation: validationStub, authentication: authenticationStub });
	return {
		sut,
		validationStub,
		authenticationStub
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

	it("Should call authentication with correct values", async () => {
		const { sut, authenticationStub } = makeSut();
		const authSpy = jest.spyOn(authenticationStub, "auth");
		await sut.handle(makeFakeRequest());
		expect(authSpy).toHaveBeenCalledWith(makeFakeRequest().body);
	});
});
