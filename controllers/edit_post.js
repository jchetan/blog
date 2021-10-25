const BlogPost = require('../models/BlogPost');

module.exports = (req, res) =>{
    BlogPost.findById(req.params.id, (error, blogpost) =>{
        res.render('edit_post', {blogpost: blogpost});
        console.log(error,blogpost)
    })     
}