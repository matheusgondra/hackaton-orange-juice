import { PrismaHelper } from "../../../../helpers/prisma-helper";
import { AdministratorRepository } from "../../../../../src/infra/db";

const makeSut = (): AdministratorRepository => {
	return new AdministratorRepository();
};

describe("AdministratorRepository", () => {
	beforeEach(async () => {
		await PrismaHelper.connect();
		await PrismaHelper.createAdm();
	});

	afterEach(async () => {
		await PrismaHelper.disconnect();
	});

	describe("loadByName()", () => {
		it("Should return an administrator on success", async () => {
			const sut = makeSut();
			const administrator = await sut.loadByName("Administrador");
			expect(administrator).toEqual({
				id: expect.any(Number),
				name: "Administrador",
				password: expect.any(String)
			});
		});
	});

	describe("loadById()", () => {
		it("Should return an administrator on success", async () => {
			const sut = makeSut();
			const administrator = await sut.loadById(1);
			expect(administrator).toEqual({
				id: expect.any(Number),
				name: "Administrador",
				password: expect.any(String)
			});
		});

		it("Should return null if administrator not found", async () => {
			const sut = makeSut();
			const administrator = await sut.loadById(2);
			expect(administrator).toBeNull();
		});
	});
});
