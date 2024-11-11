"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("./constants");
const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${constants_1.COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token not received" });
    }
    return new Promise((resolve, reject) => {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ meesage: "Token not valid" });
            }
            else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token-manager.js.map