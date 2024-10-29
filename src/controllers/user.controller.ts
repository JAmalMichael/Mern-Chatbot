import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { hash } from "bcryptjs"

export const getAllUser = async(req: Request, res: Response) => {
    try {
        const users = await User.find();
        if(!users) {
          return  res.status(400).json({message: "No user found"})
        }

        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}


export const userSignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
         const  {name, email, password} = req.body;
         const hashedPassword = await hash(password, 10);
         const user = new User({name, email, password: hashedPassword});
         await user.save()
         res.status(201).json(user);
         next()
     } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
     }

}