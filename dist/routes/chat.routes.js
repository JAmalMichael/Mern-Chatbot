"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_manager_1 = require("../utils/token-manager");
const validators_1 = require("../utils/validators");
const chat_controllers_1 = require("../controllers/chat.controllers");
const chatRouter = (0, express_1.Router)();
chatRouter.post("/new", (0, validators_1.validate)(validators_1.chatValidator), token_manager_1.verifyToken, chat_controllers_1.generateChat);
exports.default = chatRouter;
//# sourceMappingURL=chat.routes.js.map