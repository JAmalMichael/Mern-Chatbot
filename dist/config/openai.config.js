"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureOpenAi = void 0;
const openai_1 = require("openai");
const configureOpenAi = () => {
    const config = new openai_1.Configuration({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPEN_AI_ORGANIZATION_ID,
    });
};
exports.configureOpenAi = configureOpenAi;
//# sourceMappingURL=openai.config.js.map