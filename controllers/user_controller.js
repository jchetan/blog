const User = require('../models/User');
const BlogPost = require('../models/BlogPost');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require("express-validator");

exports.register_get = function (req, res) {
    
    var errorMessages = req.app.errorMessages;
    req.app.userMessage = null;   
    req.app.errorMessages = null;
    res.render('users/register', {errorMessages: errorMessages});
}

exports.view_profile_get = async function (req, res) {   
    
    const user = await User.findById(req.session.userId);
    const blogposts = await BlogPost.find({userId: req.session.userId}).populate('userId');

    console.log(user);
    if (user) {                
        res.render('users/view_profile', {user: user, blogposts: blogposts});
    } else {
        req.app.userMessage ='You seem to have logged out';
        res.redirect('/users/login');
        return;                        
    }
}

exports.register_post = [
    check('name')
        .trim()
        .escape()
        .not()
        .isEmpty()        
        .withMessage('Name is required'),
    check('username')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage('Username is required and should be a valid email id')
        .bail()
        .isEmail()
        .withMessage("Username should be a valid email format"),
    check('password')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage('Password is required')
        .bail()
        .custom((val, { req }) => {
            if (val !== req.body.confirm_password) {
                throw new Error("Passwords don't match");
            } else {
                return true;
            }
        }),    
    async function (req, res) {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.app.errorMessages = errors.array();
            res.redirect('/users/register');
            return;
        } else {
            var date_time = new Date();            
            const user = await User.findOne({username: req.body.username});
               
            if (user) {
                var err = [{msg: "User is already registered"}];
                req.app.errorMessages = err;
                res.redirect('/users/register');
                return;                              
            } else {
                const hashedPassword = bcrypt.hashSync(req.body.password, 10);
                const user = await User.create(
                    {
                        username: req.body.username,
                        password: hashedPassword,
                        name: req.body.name,
                        date_account_created: date_time.toJSON().slice(0,19).replace('T',':'),                
                    });
                    
                if (user) {
                    req.app.userMessage ='Registered Successfully, please Login to continue';
                    res.redirect('/users/login');
                } else {
                    req.app.userMessage ='There is some problem registering the user';
                    res.redirect('/users/register');
                }
                
            }
               
        }    
    }
];

exports.login_get = function (req, res) {
    var userMessage = req.app.userMessage;
    var errorMessages = req.app.errorMessages;
    req.app.userMessage = null;   
    req.app.errorMessages = null;    
    res.render('users/login', {userMessage: userMessage, errorMessages: errorMessages});
}

exports.login_post = [
    check('username')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Username is required')
        .bail()
        .isEmail()
        .withMessage("Username should be a valid email format"),
    check('password')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Password is required'),
    async function (req, res) {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            req.app.errorMessages = errors.array();
            res.redirect('/users/login');
            return;
        } else {
            const user = await User.findOne({username: req.body.username});                   
            if (user) {                
                const result = bcrypt.compareSync(req.body.password, user.password)                 
                if (result) {                    
                    req.session.userId = user._id;
                    req.app.userMessage ='Logged in Successfully';
                    res.redirect('/');
                } else {
                    var err = [{msg: "Incorrect Password, please try again"}];
                    req.app.errorMessages = err;
                    res.redirect('/users/login');
                    return;
                }   
            } else {
                var err = [{msg: "User does not exist, please register first"}];
                req.app.errorMessages = err;
                res.redirect('/users/login');
                return;                        
            }
        }
    }
];

exports.logout_get = function (req, res) {    
    req.session.destroy();
    req.app.userMessage = 'Logged out Successfully';
    res.redirect('/users/login');    
}