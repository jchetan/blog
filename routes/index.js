// GET home page.

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/posts/view_all');
});

module.exports = router;