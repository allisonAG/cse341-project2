const router = require('express').Router();
const usersController = require('../controllers/users');
const { createUserValidation, updateUserValidation } = require('../validators/users');
const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post(
    '/',
    createUserValidation,
    validate,
    usersController.createUser
);
router.put(
    '/:id',
    updateUserValidation,
    validate,
    usersController.updateUser
);
router.delete('/:id', usersController.deleteUser);

module.exports = router;