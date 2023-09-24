"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const adapters_1 = require("../adapters");
const factories_1 = require("../factories");
exports.auth = (0, adapters_1.adaptMiddleware)((0, factories_1.makeAuthMiddleware)());
//# sourceMappingURL=auth.js.map