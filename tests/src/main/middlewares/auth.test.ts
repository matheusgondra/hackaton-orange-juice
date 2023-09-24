import request from "supertest";
import app from "../../../../src/main/config/app";
import { PrismaHelper } from "../../../helpers/prisma-helper";
import { auth } from "../../../../src/main/middlewares";

describe("Auth Middleware", () => {
	beforeEach(async () => {
		await PrismaHelper.connect();
	});

	afterEach(async () => {
		await PrismaHelper.disconnect();
	});

	beforeAll(async () => {
		app.get("/test_auth", auth, (req, res) => {
			res.send();
		});
	});

	it("Should return 401 if no authorization header is provided", async () => {
		await request(app).get("/test_auth").expect(401);
	});

	it("Should return 401 if authorization header is invalid", async () => {
		await request(app).get("/test_auth").set("authorization", "invalid_token").expect(401);
	});
});
