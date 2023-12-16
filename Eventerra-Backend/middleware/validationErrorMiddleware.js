const { validationResult } = require('express-validator');

const validationErrorMiddleware = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        const errorDetails = errors.array().map(error => ({
            type: error.type,
            path: error.path,
            value: error.value,
            message: error.msg,
        }));

        return res.status(400).json({ errors: errorDetails });
    }

    next(); // Continue to the next middleware or route handler
};

module.exports = validationErrorMiddleware;