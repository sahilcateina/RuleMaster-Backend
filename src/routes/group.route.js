const express = require('express');
const router = express.Router();
const controller = require('../controllers/group.controller');

router.get('/', controller.getGroups);

module.exports = router;
