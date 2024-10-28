"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = databaseConnect;
const mongoose_1 = require("mongoose");
async function databaseConnect() {
    try {
        await (0, mongoose_1.connect)(process.env.MONGODB_URL);
        console.log(`App is connected to Database`);
    }
    catch (error) {
        console.log("error");
        throw new Error("Error connecting to mongodb");
    }
}
//# sourceMappingURL=dbconnect.js.map