import { Router } from "express";
import { getAllUser, userSignUp, userLogIn, verifyUser } from "../controllers/user.controller.js";
import { validate, signupValidator, loginValidator } from '../utils/validators.js'
import { verifyToken } from "../utils/token-manager.js";
const userRouter = Router();


userRouter.get('/', getAllUser)
userRouter.post('/signup', validate(signupValidator), userSignUp)
userRouter.post('/login', validate(loginValidator), userLogIn)
userRouter.get('/auth-status', verifyToken, verifyUser)

export default userRouter;