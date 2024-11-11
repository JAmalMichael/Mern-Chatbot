import { Router } from "express";
import { verifyToken } from "../utils/token-manager";
const chatRouter = Router();

chatRouter.post("/new", verifyToken, )


export default chatRouter;