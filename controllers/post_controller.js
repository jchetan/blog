const BlogPost = require('../models/BlogPost');
const { check,  validationResult} = require("express-validator");

exports.view_all_get = async function (req, res) {

    const blogposts = await BlogPost
        .find({})
        .populate('userId');
    
    var userMessage = req.app.userMessage;
    req.app.userMessage = null;        
    res.render('index', {blogposts: blogposts, userMessage: userMessage});
}

exports.view_one_get = async function (req, res) {
    
    try {
        const blogpost = await BlogPost
        .findById(req.params.id)
        .populate('userId');
        console.log(blogpost);

        var userMessage = req.app.userMessage;
        req.app.userMessage = null;                    
        res.render('posts/view_one', {blogpost: blogpost, userMessage : userMessage});  
    } catch (err) {
        req.app.userMessage ='This post does not exist';
        res.redirect('/');
        console.log(err);
    } 
}

exports.create_get = function (req, res) {
    if(req.session.userId){
        var errorMessages = req.app.errorMessages;
        req.app.errorMessages = null; 
        return res.render("posts/create", {errorMessages: errorMessages});
    }
    res.redirect('/users/login')
}

exports.create_post = [
    check('blog_title')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage('Blog Title is required'),
    check('blog_content')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage('Content is required'),
    async function(req, res) {
        var errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            req.app.errorMessages = errors.array();
            res.redirect('/posts/create');
            return;
        } else {
            var date_time = new Date();
            const blogpost = await BlogPost.create(
                {
                    title: req.body.blog_title,
                    body: req.body.blog_content,
                    userId: req.session.userId,
                    date_posted: date_time.toJSON().slice(0,19).replace('T',':'),
                    date_updated: date_time.toJSON().slice(0,19).replace('T',':')
                });
                
            if (blogpost) {
                req.app.userMessage ='Post Saved Successfully';
                res.redirect('/posts/view_one/'+blogpost._id);
            } else {
                req.app.userMessage ='Cannot create Blog Post';
                res.redirect('/');
            }            
        }     
    }
] 
    
exports.edit_get = async function (req, res) {
    
    const blogpost = await BlogPost.findById(req.params.id);
    
    if (blogpost) {
        if(req.session.userId){      
            console.log("inside the edit post handler");
            var errorMessages = req.app.errorMessages;
            req.app.errorMessages = null;      
            console.log(errorMessages); 
            return res.render('posts/edit', {blogpost: blogpost, errorMessages: errorMessages});            
        }
        req.app.userMessage ='Please Login to Edit Posts';
        res.redirect('/users/login')
    } else {
        req.app.userMessage ='Cannot find post to edit';
        res.redirect('/');
    }
}

exports.edit_post = [
    check('blog_title')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage('Blog Title cannot be empty'),
    check('blog_content')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage('Blog Content cannot be empty'),
    async function (req,res) {
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log("there is an error");
            const blogpost = await BlogPost.findById(req.body.blog_id);
            req.app.errorMessages = errors.array();
            res.redirect('/posts/edit/' + req.body.blog_id);
            return;
        } else {
            var date_time = new Date();
            const blogpost = await BlogPost.findByIdAndUpdate(
                req.body.blog_id, 
                {
                    title: req.body.blog_title,
                    body: req.body.blog_content,
                    date_updated: date_time.toJSON().slice(0,19).replace('T',':')
                });
                
            if (blogpost) {            
                req.app.userMessage ='Post Saved Successfully';
                res.redirect('/posts/view_one/'+blogpost._id);
            } else {
                req.app.userMessage ='Error saving blog post';
                res.redirect('/');
            }
        }
    }
]