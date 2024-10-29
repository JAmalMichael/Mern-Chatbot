"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidator = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (validations) => {
    return async (req, res, next) => {
        const errors = [];
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                errors.push(...result.array());
            }
        }
        const validationErrors = (0, express_validator_1.validationResult)(req);
        if (!validationErrors.isEmpty()) {
            errors.push(...validationErrors.array());
        }
        if (errors.length > 0) {
            return res.status(422).json({ errors });
        }
        next();
    };
};
exports.validate = validate;
exports.signupValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)("email").trim().isEmail().withMessage('email is required'),
    (0, express_validator_1.body)("password").trim().isLength({ min: 8 }).withMessage('Password should contain at least 8 characters'),
];
//# sourceMappingURL=validators.js.map