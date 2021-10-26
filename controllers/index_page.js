const BlogPost = require('../models/BlogPost');

module.exports = (req, res) =>{
    
    BlogPost.find(
        {},
        (error, blogposts) => {
            res.render('index', {blogposts: blogposts});
        }
    );
}