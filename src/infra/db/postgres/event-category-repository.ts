import { AddEventRepository } from "../../../data";
import { db } from "./prisma";

export class EventCategoryRepository implements AddEventRepository {
	async add(newEvent: AddEventRepository.Params): Promise<AddEventRepository.Result> {
		try {
			const eventCreated = await db.event.create({
				data: {
					name: newEvent.name,
					date: newEvent.date,
					hour: newEvent.hour,
					image: newEvent.image,
					description: newEvent.description,
					address: {
						create: {
							street: newEvent.street,
							number: newEvent.number,
							city: newEvent.city,
							state: newEvent.state,
							zip_code: newEvent.cep
						}
					}
				}
			});

			const categoriesDb = await db.category.findMany({ where: { name: { in: newEvent.categories } } });

			const result = newEvent.categories.map(async (category) => {
				const category_id = categoriesDb.find((dbCategory) => dbCategory.name === category);
				if (category_id) {
					return await db.eventCategory.create({
						data: {
							event_id: eventCreated.id,
							category_id: category_id.id
						}
					});
				}
			});
			if (result) {
				return true;
			}
			return false;
		} catch (error) {
			return false;
		}
	}
}
