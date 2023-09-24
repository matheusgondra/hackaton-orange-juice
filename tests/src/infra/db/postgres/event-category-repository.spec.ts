import { EventCategoryRepository } from "../../../../../src/infra/db";

describe("EventCategoryRepository", () => {
	it("Should return true on success", async () => {
		const sut = new EventCategoryRepository();
		const eventCategory = await sut.add({
			name: "any_name",
			date: new Date("2021-10-10"),
			hour: "08:10:10",
			image: "any_image",
			description: "any_description",
			categories: ["any_category"],
			street: "any_street",
			number: 1,
			city: "any_city",
			state: "any_state",
			cep: "any_cep"
		});
		expect(eventCategory).toBe(true);
	});

	it("Should return false on failure", async () => {
		const sut = new EventCategoryRepository();
		jest.spyOn(sut, "add").mockReturnValueOnce(new Promise((resolve) => resolve(false)));
		const eventCategory = await sut.add({
			name: "any_name",
			date: new Date("2021-10-10"),
			hour: "08:10:10",
			image: "any_image",
			description: "any_description",
			categories: ["any_category"],
			street: "any_street",
			number: 1,
			city: "any_city",
			state: "any_state",
			cep: "any_cep"
		});
		expect(eventCategory).toBe(false);
	});
});
