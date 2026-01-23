const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        username: 'required|string',
        age: 'required|integer',
        role: 'required|string',
        active: 'required|boolean',
        createdAt: 'required|date'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveUser
};