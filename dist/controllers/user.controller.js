"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogIn = exports.userSignUp = exports.getAllUser = void 0;
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
const userSignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ message: "User already exist" });
        }
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 10);
        const user = new User_1.default({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json(user);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.userSignUp = userSignUp;
const userLogIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not registered" });
        }
        const isMatched = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isMatched) {
            return res.status(400).json({ message: 'Invalid credentials / Incorrect Password' });
        }
        res.status(200).json({ message: "User logged in successfully.", user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.userLogIn = userLogIn;
//# sourceMappingURL=user.controller.js.map