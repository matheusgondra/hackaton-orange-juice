import { Validation, badRequest, serverError, success, unauthorized } from "../../../../src/application/helpers";
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
	const sut = new LoginController(validationStub, authenticationStub);
	return {
		sut,
		validationStub,
		authenticationStub
	};
};

const makeFakeRequest = () => ({
	password: "any_password"
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
		expect(authSpy).toHaveBeenCalledWith(makeFakeRequest());
	});

	it("Should return 401 if invalid credentials is provided", async () => {
		const { sut, authenticationStub } = makeSut();
		jest.spyOn(authenticationStub, "auth").mockResolvedValueOnce(null);
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(unauthorized());
	});

	it("Should return 500 if authentication throws", async () => {
		const { sut, authenticationStub } = makeSut();
		jest.spyOn(authenticationStub, "auth").mockRejectedValueOnce(new Error());
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(serverError(new Error()));
	});

	it("Should return 200 if valid credentials is provided", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(success({ accessToken: "access_token" }));
	});
});
