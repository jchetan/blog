const BlogPost = require('../models/BlogPost');

module.exports = (req, res) =>{
    BlogPost.findById(req.params.id, (error, blogpost) =>{

        res.render('view_post', {blogpost: blogpost});
     
    })   
}