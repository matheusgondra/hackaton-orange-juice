"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factories_1 = require("../factories");
const adapters_1 = require("../adapters");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.post("/event", middlewares_1.auth, (0, adapters_1.adaptRoute)((0, factories_1.makeEventRegisterController)()));
};
//# sourceMappingURL=event-routes.js.map