import { Router } from "express";
import { verifyToken } from "../utils/token-manager";
import { chatValidator, validate } from "../utils/validators";
import { generateChat } from "../controllers/chat.controllers";
const chatRouter = Router();

chatRouter.post("/new",validate(chatValidator),  verifyToken, generateChat)


export default chatRouter;