import { Router } from "express";
import { getAllUser, userSignUp, userLogIn } from "../controllers/user.controller.js";
import { validate, signupValidator, loginValidator } from '../utils/validators.js'
const userRouter = Router();


userRouter.get('/', getAllUser)
userRouter.post('/signup', validate(signupValidator), userSignUp)
userRouter.post('/login', validate(loginValidator), userLogIn)

export default userRouter;