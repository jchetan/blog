const BlogPost = require('../models/BlogPost');

module.exports = (req, res) =>{
    BlogPost.find(
        {},
        (error, blogposts) => {
            console.log(blogposts);
            res.render('index', {blogposts: blogposts});
        }
    );
}