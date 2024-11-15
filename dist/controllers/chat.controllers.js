"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChat = void 0;
const User_1 = __importDefault(require("../models/User"));
const openai_config_1 = require("../config/openai.config");
const openai_1 = require("openai");
const generateChat = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered" });
        }
        // grab chats of the user
        const chats = user.chats.map(({ role, content }) => ({
            role, content
        }));
        chats.push({ content: message, role: 'user' });
        user.chats.push({ content: message, role: "user" });
        // send chat to openai and get response
        const config = (0, openai_config_1.configureOpenAi)();
        const openai = new openai_1.OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.generateChat = generateChat;
//# sourceMappingURL=chat.controllers.js.map