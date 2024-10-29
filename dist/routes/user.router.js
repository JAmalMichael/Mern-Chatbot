"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_js_1 = require("../controllers/user.controller.js");
const userRouter = (0, express_1.Router)();
userRouter.get('/', user_controller_js_1.getAllUser);
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map