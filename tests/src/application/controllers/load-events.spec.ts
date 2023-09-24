import { LoadEventsController } from "../../../../src/application/controllers";
import { success } from "../../../../src/application/helpers";
import { LoadEvents } from "../../../../src/domain";

const makeFakeData = (): LoadEvents.Result => [
	{
		id: 1,
		name: "any_name",
		date: new Date("2021-01-01"),
		hour: "00:00:00",
		image: "any_image",
		description: "any_description",
		street: "any_street",
		number: 1,
		city: "any_city",
		state: "any_state",
		zip_code: "any_zip_code",
		categories: ["any_category"]
	},
	{
		id: 2,
		name: "any_name",
		date: new Date("2021-01-01"),
		hour: "00:00:00",
		image: "any_image",
		description: "any_description",
		street: "any_street",
		number: 1,
		city: "any_city",
		state: "any_state",
		zip_code: "any_zip_code",
		categories: ["any_category"]
	}
];

const makeLoadEventsStub = (): LoadEvents => {
	class LoadEventsStub implements LoadEvents {
		async load(): Promise<LoadEvents.Result> {
			return makeFakeData();
		}
	}
	return new LoadEventsStub();
};

interface SutTypes {
	sut: LoadEventsController;
	loadEventsStub: LoadEvents;
}

const makeSut = (): SutTypes => {
	const loadEventsStub = makeLoadEventsStub();
	const sut = new LoadEventsController({ loadEvents: loadEventsStub });
	return {
		sut,
		loadEventsStub
	};
};

describe("LoadEventsController", () => {
	it("Should call loadEvents with correct values", async () => {
		const { sut, loadEventsStub } = makeSut();
		const loadSpy = jest.spyOn(loadEventsStub, "load");
		await sut.handle();
		expect(loadSpy).toHaveBeenCalled();
	});

	it("Should return 200 on success", async () => {
		const { sut } = makeSut();
		const response = await sut.handle();
		expect(response).toEqual(success(makeFakeData()));
	});
});
