var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user_controller');

router.get('/register_new_user', user_controller.register_new_user);
router.post('/save_new_user', user_controller.save_new_user);
router.get('/login_user', user_controller.login_user);
router.post('/validate_login_user', user_controller.validate_login_user);
router.get('/logout_user', user_controller.logout_user);

module.exports = router;