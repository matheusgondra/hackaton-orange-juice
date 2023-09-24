import { LoadEventsController } from "../../../../src/application/controllers";
import { LoadEvents } from "../../../../src/domain";

describe("LoadEventsController", () => {
	it("Should call loadEvents with correct values", async () => {
		class LoadEventsStub implements LoadEvents {
			async load(): Promise<LoadEvents.Result> {
				return [
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
					}
				];
			}
		}
		const loadEventsStub = new LoadEventsStub();
		const sut = new LoadEventsController({ loadEvents: loadEventsStub });
		const loadSpy = jest.spyOn(loadEventsStub, "load");
		await sut.handle();
		expect(loadSpy).toHaveBeenCalled();
	});
});
