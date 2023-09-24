"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const main = async () => {
    const gratuito = await __1.db.category.upsert({
        where: { name: "gratuito" },
        update: {},
        create: { name: "gratuito" }
    });
    const pago = await __1.db.category.upsert({
        where: { name: "pago" },
        update: {},
        create: { name: "pago" }
    });
    const presencial = await __1.db.category.upsert({
        where: { name: "presencial" },
        update: {},
        create: { name: "presencial" }
    });
    const online = await __1.db.category.upsert({
        where: { name: "online" },
        update: {},
        create: { name: "online" }
    });
    console.log({ gratuito, pago, presencial, online });
};
main()
    .then(async () => {
    await __1.db.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await __1.db.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=category-seed.js.map