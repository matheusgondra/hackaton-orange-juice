import { LoginController } from "../../../application/controllers";
import { DbAuthentication } from "../../../data";
import { BcryptAdapter, JwtAdapter } from "../../../infra/cryptography";
import { AdministratorRepository } from "../../../infra/db";
import { RequiredFieldValidation, ValidationComposite } from "../../../validation";
import env from "../../config/env";
import { makeLoginValidation } from "../validators";

export const makeLoginController = (): LoginController => {
	const secret = env.secret;
	const encrypter = new JwtAdapter(secret);
	const salt = env.salt;
	const hashComparer = new BcryptAdapter(salt);
	const loadAdministratorByNameRepository = new AdministratorRepository();
	const authentication = new DbAuthentication(loadAdministratorByNameRepository, hashComparer, encrypter);
	const validation = makeLoginValidation();
	return new LoginController(validation, authentication);
};
