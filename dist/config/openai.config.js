"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureOpenAI = void 0;
const openai_1 = __importDefault(require("openai"));
const configureOpenAI = () => {
    const apiKey = process.env.OPEN_AI_SECRET;
    const organizationId = process.env.OPENAI_ORGANIZATION_ID;
    if (!apiKey) {
        throw new Error("Missing OpenAI API key.");
    }
    if (!organizationId) {
        throw new Error("Missing OpenAI organization ID.");
    }
    const config = new openai_1.default({
        apiKey: apiKey,
        organization: organizationId,
    });
    return config;
};
exports.configureOpenAI = configureOpenAI;
//# sourceMappingURL=openai.config.js.map