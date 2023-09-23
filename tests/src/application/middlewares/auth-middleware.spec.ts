import { unauthorized } from "../../../../src/application/helpers";
import { AuthMiddleware } from "../../../../src/application/middlewares";

interface SutTypes {
	sut: AuthMiddleware;
}

const makeSut = (): SutTypes => {
	const sut = new AuthMiddleware();
	return {
		sut
	};
};

describe("AuthMiddleware", () => {
	it("Should return 403 if no access-token exists in headers", async () => {
		const { sut } = makeSut();
		const request = {};
		const httpResponse = await sut.handle(request);
		expect(httpResponse).toEqual(unauthorized());
	});
});
