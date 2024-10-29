"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignUp = exports.getAllUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = require("bcryptjs");
const getAllUser = async (req, res) => {
    try {
        const users = await User_1.default.find();
        if (!users) {
            return res.status(400).json({ message: "No user found" });
        }
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllUser = getAllUser;
const userSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 10);
        const user = new User_1.default({ name, email, password: hashedPassword });
        await user.save();
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.userSignUp = userSignUp;
//# sourceMappingURL=user.controller.js.map