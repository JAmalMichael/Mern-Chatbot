import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "../utils/constants";

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

         //creating and storing cookie on user sign in
         res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true, 
            signed: true,
            path: "/"
          });

          //creates a token
          const payload = { id: user.id, email }

          const token = jwt.sign(payload, process.env.JWT_SECRET , {
            expiresIn: "2d",
          })

          //setting date for cookie to expire
          const expires = new Date();
          expires.setDate(expires.getDate() + 2);

          //creating an http only cookie with our token which is stored in the local host as our current domain.
          res.cookie(COOKIE_NAME, token, {path: "/", domain: "localhost", expires, httpOnly: true, signed: true});


          res.status(200).json({message: "User created succesfully", token, name: user.name, email: user.email})
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

          //clears the cookie on new user login
          res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true, 
            signed: true,
            path: "/"
          });

          //creates a token
          const payload = { id: user.id, email }

          const token = jwt.sign(payload, process.env.JWT_SECRET , {
            expiresIn: "2d",
          })

          //setting date for cookie to expire
          const expires = new Date();
          expires.setDate(expires.getDate() + 2);

          //creating an http only cookie with our token which is stored in the local host as our current domain.
          res.cookie(COOKIE_NAME, token, {path: "/", domain: "localhost", expires, httpOnly: true, signed: true});


          res.status(200).json({message: "User logged in succesfully", name: user.name, email: user.email})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const verifyUser = async(req: Request, res: Response, next: NextFunction) => {
  try {
      const user = await User.findById(res.locals.jwtData.id);
      if(!user) {
          return res.status(401).json({message: "User not registered or token not found"});
      }
      if(user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permission not found"); 
      } 


        res.status(200).json({message: "User verified", name: user.name, email: user.email})
  } catch (error) {
      console.log(error)
      res.status(500).json({message: "Internal server error"})
  }
}