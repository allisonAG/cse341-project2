const validator = require('../helpers/validate');

const saveBook = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        author: 'required|string',
        isbn: 'required|string',
        genre: 'required|string',
        pages: 'required|integer',
        publishedYear: 'required|integer',
        available: 'required|boolean'
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
    saveBook
};