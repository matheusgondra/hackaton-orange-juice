import request from "supertest";
import app from "../../../../src/main/config/app";
import { PrismaHelper } from "../../../helpers/prisma-helper";

describe("Administrator Routes", () => {
	beforeEach(async () => {
		await PrismaHelper.connect();
		await PrismaHelper.createAdm();
	});

	afterEach(async () => {
		await PrismaHelper.disconnect();
	});

	describe("POST /adm-login", () => {
		it("Should return 200 on login", async () => {
			await request(app).post("/adm-login").send({ password: "123456" }).expect(200);
		});
	});
});
