const express = require('express');
const router = express.Router();
const controller = require('../controllers/rules.controller');


// Original endpoints
router.put('/:id', controller.updateRule);
router.delete('/:id', controller.deleteRule);
router.get('/', controller.getAllRules);
router.post('/apply', controller.applyRules);

// Enhanced create endpoint with Gemini NLP
router.post('/create', controller.parseAndCreateRule);

module.exports = router;
        