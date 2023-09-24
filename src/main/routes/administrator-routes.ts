import { Router } from "express";
import { makeLoginController } from "../factories";
import { adaptRoute } from "../adapters";

export default (router: Router): void => {
	router.post("/adm-login", adaptRoute(makeLoginController()));
};
