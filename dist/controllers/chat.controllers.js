"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChat = void 0;
const User_1 = __importDefault(require("../models/User"));
// import { configureOpenAI } from "../config/openai.config";
const openai_1 = __importDefault(require("openai"));
const generateChat = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized request" });
        }
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content
        }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        //configure ai
        // const config = configureOpenAI();
        const apiKey = process.env.OPEN_AI_SECRET;
        const organizationId = process.env.OPENAI_ORGANIZATION_ID;
        if (!apiKey) {
            throw new Error("Missing OpenAI API key.");
        }
        if (!organizationId) {
            throw new Error("Missing OpenAI organization ID.");
        }
        const openai = new openai_1.default({
            organization: organizationId,
            apiKey: apiKey,
        });
        //send chats to ai
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
            stream: true, // For streaming responses
            max_tokens: 1000, // Set appropriate token limit
            temperature: 0.7,
        });
        //get response from ai
        let assistantMessage = "";
        for await (const chunk of chatResponse) {
            const delta = chunk.choices[0]?.delta?.content;
            if (delta) {
                assistantMessage += delta;
            }
        }
        // Push the complete response to user.chats
        if (assistantMessage) {
            user.chats.push({
                role: "assistant",
                content: assistantMessage,
            });
        }
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error(error instanceof Error ? error.message : error);
        return res.status(500).json({ meesage: "AI Error, Internal server error" });
    }
};
exports.generateChat = generateChat;
//# sourceMappingURL=chat.controllers.js.map