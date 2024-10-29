import { Router } from "express";
import { getAllUser, userSignUp } from "../controllers/user.controller.js";
import { validate, signupValidator } from '../utils/validators.js'
const userRouter = Router();


userRouter.get('/', getAllUser)
userRouter.post('/signup', validate(signupValidator), userSignUp)

export default userRouter;