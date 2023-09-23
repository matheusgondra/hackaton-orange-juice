import { unauthorized } from "../../../../src/application/helpers";
import { AuthMiddleware } from "../../../../src/application/middlewares";

describe("AuthMiddleware", () => {
	it("Should return 403 if no access-token exists in headers", async () => {
		const sut = new AuthMiddleware();
		const request = {};
		const httpResponse = await sut.handle(request);
		expect(httpResponse).toEqual(unauthorized());
	});
});
