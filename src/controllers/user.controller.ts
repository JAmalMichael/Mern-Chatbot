import { Request, Response } from "express";
import User from "../models/User"

export const getAllUser = async(req: Request, res: Response) => {
    try {
        const users = await User.find();
        if(!users) {
            res.status(400).json({message: "No user found"})
        }

        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}