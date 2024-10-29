import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { hash, compare } from "bcryptjs"

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
         const existingUser = await User.findOne({ email });
         if(existingUser){
            return res.status(401).json({message: "User already exist"});
         }
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

export const userLogIn = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({message: "User not registered"});
        }
        const isMatched = await compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({ message: 'Invalid credentials / Incorrect Password' });
          }

          res.status(200).json({message: "User logged in successfully.", user})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

