"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_js_1 = require("../controllers/user.controller.js");
const validators_js_1 = require("../utils/validators.js");
const userRouter = (0, express_1.Router)();
userRouter.get('/', user_controller_js_1.getAllUser);
userRouter.post('/signup', (0, validators_js_1.validate)(validators_js_1.signupValidator), user_controller_js_1.userSignUp);
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map