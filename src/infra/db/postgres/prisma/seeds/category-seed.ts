import { db } from "..";

const main = async () => {
	const gratuito = await db.category.upsert({
		where: { name: "gratuito" },
		update: {},
		create: { name: "gratuito" }
	});
	const pago = await db.category.upsert({
		where: { name: "pago" },
		update: {},
		create: { name: "pago" }
	});
	const presencial = await db.category.upsert({
		where: { name: "presencial" },
		update: {},
		create: { name: "presencial" }
	});
	const online = await db.category.upsert({
		where: { name: "online" },
		update: {},
		create: { name: "online" }
	});
	console.log({ gratuito, pago, presencial, online });
};

main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await db.$disconnect();
		process.exit(1);
	});
