import { Router } from "express";
import { makeEventRegisterController } from "../factories";
import { adaptRoute } from "../adapters";
import { auth } from "../middlewares";

export default (router: Router): void => {
	router.post("/event", auth, adaptRoute(makeEventRegisterController()));
};
