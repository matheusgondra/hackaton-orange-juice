import { AuthMiddleware } from "../../../application/middlewares";
import { DbLoadAdministratorById } from "../../../data";
import { JwtAdapter } from "../../../infra/cryptography";
import { AdministratorRepository } from "../../../infra/db";
import env from "../../config/env";

export const makeAuthMiddleware = (): AuthMiddleware => {
	const secret = env.secret;
	const decrypter = new JwtAdapter(secret);
	const loadAdministratorByIdRepository = new AdministratorRepository();
	const loadAdministratorById = new DbLoadAdministratorById({ loadAdministratorByIdRepository });
	return new AuthMiddleware(decrypter, loadAdministratorById);
};
