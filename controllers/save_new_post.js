const BlogPost = require('../models/BlogPost');

module.exports = (req, res) =>{
    var date_time = new Date();
    BlogPost.create(
        {
            title: req.body.blog_title,
            body: req.body.blog_content,
            date_posted: date_time.toJSON().slice(0,19).replace('T',':'),
            date_updated: date_time.toJSON().slice(0,19).replace('T',':')
        }, (error, blogpost) => {
            res.redirect('/create_post_confirmation_message');
        }
    );  
}