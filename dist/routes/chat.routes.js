"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_manager_1 = require("../utils/token-manager");
const chatRouter = (0, express_1.Router)();
chatRouter.post("/new", token_manager_1.verifyToken);
exports.default = chatRouter;
//# sourceMappingURL=chat.routes.js.map