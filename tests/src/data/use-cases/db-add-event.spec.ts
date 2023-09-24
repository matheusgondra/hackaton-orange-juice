import { AddEventRepository } from "../../../../src/data/protocols";
import { DbAddEvent } from "../../../../src/data";

const makeAddEventRepository = (): AddEventRepository => {
	class AddEventRepositoryStub implements AddEventRepository {
		async add(event: AddEventRepository.Params): Promise<AddEventRepository.Result> {
			return {
				id: 1,
				name: "any_name",
				date: new Date("2021-01-01"),
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
	return new AddEventRepositoryStub();
};

interface SutTypes {
	sut: DbAddEvent;
	addEventRepositoryStub: AddEventRepository;
}

const makeSut = (): SutTypes => {
	const addEventRepositoryStub = makeAddEventRepository();
	const sut = new DbAddEvent({ addEventRepository: addEventRepositoryStub });
	return {
		sut,
		addEventRepositoryStub
	};
};

const makeFakeData = () => ({
	name: "any_name",
	date: new Date("2021-01-01"),
	hour: "any_hour",
	image: "any_image",
	description: "any_description",
	categories: ["any_category"],
	street: "any_street",
	number: 1,
	city: "any_city",
	state: "any_state",
	cep: "any_cep"
});

describe("DbAddEvent", () => {
	it("Should call addEventRepository with correct values", async () => {
		const { sut, addEventRepositoryStub } = makeSut();
		const addSpy = jest.spyOn(addEventRepositoryStub, "add");
		await sut.add(makeFakeData());
		expect(addSpy).toHaveBeenCalledWith(makeFakeData());
	});

	it("Should throw if addEventRepository throws", async () => {
		const { sut, addEventRepositoryStub } = makeSut();
		jest.spyOn(addEventRepositoryStub, "add").mockRejectedValueOnce(new Error());
		const promise = sut.add(makeFakeData());
		await expect(promise).rejects.toThrow();
	});

	it("Should return an event on success", async () => {
		const { sut } = makeSut();
		const event = await sut.add(makeFakeData());
		expect(event).toEqual({ ...makeFakeData(), id: 1 });
	});
});
