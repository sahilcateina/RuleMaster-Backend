const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.post('/', controller.createUser);
router.get('/', controller.getUsers);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
