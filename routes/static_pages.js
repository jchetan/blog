var express = require('express');
var router = express.Router();
var static_pages_controller = require('../controllers/static_pages_controller');

router.get('/about', static_pages_controller.about);
router.get('/contact', static_pages_controller.contact);

module.exports = router;