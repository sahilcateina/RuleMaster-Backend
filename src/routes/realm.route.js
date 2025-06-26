const express = require('express');
const router = express.Router();
const controller = require('../controllers/realm.controller');

router.post('/create', controller.createRealm);

module.exports = router;
