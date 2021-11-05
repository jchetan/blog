var express = require('express');
var router = express.Router();
var post_controller = require('../controllers/post_controller');

router.get('/view_all', post_controller.view_all_get);
router.get('/view_one/:id', post_controller.view_one_get);
router.get('/create', post_controller.create_get);
router.post('/create', post_controller.create_post);
router.get('/edit/:id', post_controller.edit_get);
router.post('/edit', post_controller.edit_post);

module.exports = router;