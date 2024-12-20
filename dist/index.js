"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dbconnect_1 = __importDefault(require("./db/dbconnect"));
const PORT = process.env.PORT || 5001;
(0, dbconnect_1.default)().then(() => {
    app_1.default.listen(PORT, () => console.log(`App is starting at PORT ${PORT}`));
}).catch((err) => console.log(err));
//# sourceMappingURL=index.js.map