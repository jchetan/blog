var express = require('express');
var router = express.Router();
var post_controller = require('../controllers/post_controller');

router.get('/', post_controller.view_all_posts);
router.get('/view_post/:id', post_controller.view_post);
router.get('/create_new_post', post_controller.create_new_post);
router.post('/save_new_post', post_controller.save_new_post);
router.get('/edit_existing_post/:id', post_controller.edit_existing_post);
router.post('/save_existing_post', post_controller.save_existing_post);

module.exports = router;