const BlogPost = require('../models/BlogPost');

exports.view_all_posts = function (req, res) {
    BlogPost.find(
        {},
        (error, blogposts) => {
            res.render('index', {blogposts: blogposts});
        }
    );
}

exports.view_post = function (req, res) {
    BlogPost.findById(req.params.id, (error, blogpost) =>{
        res.render('posts/view_post', {blogpost: blogpost});     
    });
}

exports.create_new_post = function (req, res) {
    if(req.session.username){
        return res.render("posts/create_new_post");
    }
    res.redirect('/users/login_user')
}

exports.save_new_post = function (req, res) {
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

exports.edit_existing_post = function (req, res) {
    BlogPost.findById(req.params.id, (error, blogpost) =>{
        if(req.session.username){
            return res.render('posts/edit_existing_post', {blogpost: blogpost});            
        }
        res.redirect('/users/login_user')
    }) 
}

exports.save_existing_post = function (req, res) {
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