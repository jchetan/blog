const BlogPost = require('../models/BlogPost');

module.exports = (req, res) =>{
    var date_time = new Date();
    console.log(req.params.id);
    console.log(req.body.blog_title);
    console.log(req.body.blog_content);
    BlogPost.findByIdAndUpdate(
        req.params.id, 
        {
            title: req.body.blog_title,
            body: req.body.blog_content,
            date_updated: date_time.toJSON().slice(0,19).replace('T',':')
        },
        (error, blogpost) =>{
            console.log(error,blogpost)
            res.redirect('/save_post_confirmation_message');
        }
    )
}