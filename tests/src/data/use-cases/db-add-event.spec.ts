import { AddEventRepository } from "../../../../src/data/protocols";
import { DbAddEvent } from "../../../../src/data";

describe("DbAddEvent", () => {
	it("Should call addEventRepository with correct values", async () => {
		class AddEventRepositoryStub implements AddEventRepository {
			async add(event: AddEventRepository.Params): Promise<AddEventRepository.Result> {
				return {
					id: 1,
					name: "any_name",
					date: new Date(),
					hour: "any_hour",
					image: "any_image",
					description: "any_description",
					categories: ["any_category"],
					street: "any_street",
					number: 1,
					city: "any_city",
					state: "any_state",
					cep: "any_cep"
				};
			}
		}
		const addEventRepositoryStub = new AddEventRepositoryStub();
		const sut = new DbAddEvent({ addEventRepository: addEventRepositoryStub });
		const addSpy = jest.spyOn(addEventRepositoryStub, "add");
		const data = {
			name: "any_name",
			date: new Date(),
			hour: "any_hour",
			image: "any_image",
			description: "any_description",
			categories: ["any_category"],
			street: "any_street",
			number: 1,
			city: "any_city",
			state: "any_state",
			cep: "any_cep"
		};
		await sut.add(data);
		expect(addSpy).toHaveBeenCalledWith(data);
	});
});
