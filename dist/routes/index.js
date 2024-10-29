"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_js_1 = __importDefault(require("./user.router.js"));
const chat_routes_js_1 = __importDefault(require("./chat.routes.js"));
const router = (0, express_1.Router)();
router.use('/user', user_router_js_1.default);
router.use('/chats', chat_routes_js_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map