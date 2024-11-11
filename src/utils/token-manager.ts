import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import { COOKIE_NAME } from "./constants"


export const verifyToken = async(req: Request, res: Response, next: NextFunction) => {
            const token = req.signedCookies[`${COOKIE_NAME}`];
            if(!token || token.trim() === "") {
                return res.status(401).json({message: "Token not received"})
            }
            return new Promise<void>((resolve, reject) => {
                return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
                    if(err){
                        reject(err.message)
                        return res.status(401).json({ meesage: "Token not valid"})
                    } else {
                        resolve();
                        res.locals.jwtData = success;
                        return next();
                    }
                })
            })

}