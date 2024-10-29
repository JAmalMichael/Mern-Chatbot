import { Router } from "express";
import { getAllUser, userSignUp } from "../controllers/user.controller.js";
const userRouter = Router();


userRouter.get('/', getAllUser)
userRouter.post('/signup', userSignUp)

export default userRouter;