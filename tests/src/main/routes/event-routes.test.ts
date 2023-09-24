import { PrismaHelper } from "../../../helpers/prisma-helper";
import request from "supertest";
import app from "../../../../src/main/config/app";

describe("Event Routes", () => {
	beforeEach(async () => {
		await PrismaHelper.connect();
		await PrismaHelper.createAdm();
	});

	afterEach(async () => {
		await PrismaHelper.disconnect();
	});

	describe("POST /event", () => {
		it("Should return 204 on add event", async () => {
			const response = await request(app).post("/adm-login").send({ password: "123456" }).expect(200);

			await request(app)
				.post("/event")
				.send({
					name: "Evento 1",
					date: new Date("2021-10-10"),
					hour: "08:10:10",
					image: "any_image",
					description: "any_description",
					categories: ["online", "gratuito"],
					street: "any_street",
					number: 1,
					city: "any_city",
					state: "any_state",
					cep: "any_cep"
				})
				.set("Authorization", response.body.accessToken)
				.expect(204);
		});
	});
});
