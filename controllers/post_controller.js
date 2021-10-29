const BlogPost = require('../models/BlogPost');
const { check,  validationResult} = require("express-validator");

exports.view_all_posts = function (req, res) {

    BlogPost
        .find({})
        .populate('userId')
        .exec( (error, blogposts) => {
            var userMessage = req.app.userMessage;
            req.app.userMessage = null;        
            res.render('index', {blogposts: blogposts, userMessage: userMessage});
        })    
}

exports.view_post = function (req, res) {
    BlogPost
        .findById(req.params.id)
        .populate('userId') 
        .exec( (error, blogpost) => {
            var userMessage = req.app.userMessage;
            req.app.userMessage = null;                    
            res.render('posts/view_post', {blogpost: blogpost, userMessage : userMessage});
    })
}

exports.create_new_post = function (req, res) {
    if(req.session.userId){
        return res.render("posts/create_new_post");
    }
    res.redirect('/users/login_user')
}

exports.save_new_post = [
    check('blog_title')
        .not()
        .isEmpty()
        .withMessage('Blog Title is required'),
    check('blog_content')
        .not()
        .isEmpty()
        .withMessage('Content is required'),
    function(req, res) {
        var errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            res.render('posts/create_new_post', {errors: errors.array()});
            return;
        } else {
            var date_time = new Date();
            BlogPost.create(
                {
                    title: req.body.blog_title,
                    body: req.body.blog_content,
                    userId: req.session.userId,
                    date_posted: date_time.toJSON().slice(0,19).replace('T',':'),
                    date_updated: date_time.toJSON().slice(0,19).replace('T',':')
                }, (error, blogpost) => {
                    req.app.userMessage ='Post Saved Successfully';
                    res.redirect('/posts/view_post/'+blogpost._id);
                }
            ); 
        }     
    }
] 
    

exports.edit_existing_post = function (req, res) {
    BlogPost.findById(req.params.id, (error, blogpost) =>{
        if(req.session.userId){
            return res.render('posts/edit_existing_post', {blogpost: blogpost});            
        }
        res.redirect('/users/login_user')
    }) 
}

exports.save_existing_post = [
    check('blog_title')
        .not()
        .isEmpty()
        .withMessage('Blog Title is required'),
    check('blog_content')
        .not()
        .isEmpty()
        .withMessage('Content is required'),
    function (req,res) {
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log("there is an error");
            const blogpost = BlogPost.findById(req.body.blog_id);
            res.render('posts/edit_existing_post', {blogpost: blogpost, errors: errors.array()});
            return;
        } else {
            var date_time = new Date();
            BlogPost.findByIdAndUpdate(
                req.body.blog_id, 
                {
                    title: req.body.blog_title,
                    body: req.body.blog_content,
                    date_updated: date_time.toJSON().slice(0,19).replace('T',':')
                },
                (error, blogpost) =>{            
                    req.app.userMessage ='Post Saved Successfully';
                    res.redirect('/posts/view_post/'+blogpost._id);
                }
            )
        }
    }
]