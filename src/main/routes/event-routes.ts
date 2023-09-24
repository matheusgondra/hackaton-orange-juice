import { Router } from "express";
import { makeEventRegisterController } from "../factories";
import { adaptRoute } from "../adapters";

export default (router: Router): void => {
	router.post("/event", adaptRoute(makeEventRegisterController()));
};
