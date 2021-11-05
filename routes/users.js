var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user_controller');

router.get('/register', user_controller.register_get);
router.post('/register', user_controller.register_post);
router.get('/login', user_controller.login_get);
router.post('/login', user_controller.login_post);
router.get('/logout', user_controller.logout_get);
router.get('/view_profile', user_controller.view_profile_get);

module.exports = router;