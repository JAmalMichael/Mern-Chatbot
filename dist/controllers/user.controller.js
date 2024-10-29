"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const getAllUser = async (req, res) => {
    try {
        const users = await User_1.default.find();
        if (!users) {
            res.status(400).json({ message: "No user found" });
        }
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllUser = getAllUser;
//# sourceMappingURL=user.controller.js.map