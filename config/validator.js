const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        // username must be an email
        body('email').isEmail(),
        // password must be at least 5 chars long
        body('password').isLength({ min: 5 }),
    ]
}

const productValidationRules = () => {
    return [
        // username must be an email
        body('name').notEmpty().withMessage('required'),
        // password must be at least 5 chars long
        body('price').notEmpty().withMessage('required').isNumeric().withMessage('number only'),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    userValidationRules,
    productValidationRules,
    validate,
}