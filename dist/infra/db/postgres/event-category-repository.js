"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCategoryRepository = void 0;
const prisma_1 = require("./prisma");
class EventCategoryRepository {
    async add(newEvent) {
        try {
            const eventCreated = await prisma_1.db.event.create({
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
            const categoriesDb = await prisma_1.db.category.findMany({ where: { name: { in: newEvent.categories } } });
            const result = newEvent.categories.map(async (category) => {
                const category_id = categoriesDb.find((dbCategory) => dbCategory.name === category);
                if (category_id) {
                    return await prisma_1.db.eventCategory.create({
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
        }
        catch (error) {
            return false;
        }
    }
}
exports.EventCategoryRepository = EventCategoryRepository;
//# sourceMappingURL=event-category-repository.js.map