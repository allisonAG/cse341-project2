const router = require('express').Router();
const usersController = require('../controllers/users');
const validation = require('../middlewares/validateUser');
const { isAuthenticated } = require('../middlewares/authenticate');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', isAuthenticated, validation.saveUser, usersController.createUser);
router.put('/:id', isAuthenticated, validation.saveUser, usersController.updateUser);
router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;