"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.userLogIn = exports.userSignUp = exports.getAllUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants");
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
        //creating and storing cookie on user sign in
        res.clearCookie(constants_1.COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/"
        });
        //creates a token
        const payload = { id: user.id, email };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2d",
        });
        //setting date for cookie to expire
        const expires = new Date();
        expires.setDate(expires.getDate() + 2);
        //creating an http only cookie with our token which is stored in the local host as our current domain.
        res.cookie(constants_1.COOKIE_NAME, token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true });
        res.status(200).json({ message: "User created succesfully", token, name: user.name, email: user.email });
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
        //clears the cookie on new user login
        res.clearCookie(constants_1.COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/"
        });
        //creates a token
        const payload = { id: user.id, email };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2d",
        });
        //setting date for cookie to expire
        const expires = new Date();
        expires.setDate(expires.getDate() + 2);
        //creating an http only cookie with our token which is stored in the local host as our current domain.
        res.cookie(constants_1.COOKIE_NAME, token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true });
        res.status(200).json({ message: "User logged in succesfully", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.userLogIn = userLogIn;
const verifyUser = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered or token not found" });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission not found");
        }
        res.status(200).json({ message: "User verified", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.verifyUser = verifyUser;
//# sourceMappingURL=user.controller.js.map