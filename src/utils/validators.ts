import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const errors = [];

        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                errors.push(...result.array());
            }
        }

        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            errors.push(...validationErrors.array());
        }

        if (errors.length > 0) {
            return res.status(422).json({ errors });
        }

        next();
    }
}


export const loginValidator = [
    body("email").trim().isEmail().withMessage('email is required'),
    body("password").trim().isLength({ min: 8 }).withMessage('Password should contain at least 8 characters'),
]
export const signupValidator = [
    body("name").notEmpty().withMessage('Name is required'),
    ...loginValidator
]
