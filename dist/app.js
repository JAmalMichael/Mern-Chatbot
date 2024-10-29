"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev")); //to be removed in production
app.use("/api/v1", index_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map