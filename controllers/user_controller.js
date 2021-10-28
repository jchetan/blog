const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { check,  validationResult} = require("express-validator");

exports.register_new_user = function (req, res) {
    res.render('users/register_new_user');
}

exports.save_new_user = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username is required')
        .bail()
        .isEmail()
        .withMessage("Username should be a valid email format"),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .bail()
        .custom((val, { req }) => {
            if (val !== req.body.confirm_password) {
                throw new Error("Passwords don't match");
            } else {
                return true;
            }
        }),    
    function (req, res) {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('users/register_new_user', {errors: errors.array()});
            return;
        } else {
            var date_time = new Date();
            User.findOne(
                {
                    username: req.body.username
                },
                function (err, user) {
                    if (user) {
                        var err = [{msg: "User is already registered"}];
                        res.render('users/register_new_user', {errors: err});
                        return;                              
                    } else {
                        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
                        User.create(
                            {
                                username: req.body.username,
                                password: hashedPassword,
                                date_account_created: date_time.toJSON().slice(0,19).replace('T',':'),                
                            }, (error, blogpost) => {
                                req.session.userMessage ='User Registered Successfully';
                                res.redirect('/users/login_user');
                            }
                        ); 
                    }
                }
            );
        }    
    }
];



exports.login_user = function (req, res) {
    var userMessage = req.session.userMessage;
    req.session.userMessage = null;        
    console.log(userMessage);
    if (req.session.destroySession) {
        req.session.destroy();
    }
    res.render('users/login_user', {userMessage : userMessage});
}

exports.validate_login_user = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username is required')
        .bail()
        .isEmail()
        .withMessage("Username should be a valid email format"),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required'),
    function (req, res) {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('users/login_user', {errors: errors.array()});
            return;
        } else {
            User.findOne(
                {
                    username: req.body.username
                },
                function (err, user) {
                    console.log("inside");
                    console.log(req.body.username);
                    if (user) {                
                        const result = bcrypt.compareSync(req.body.password, user.password)                 
                        if (result) {                    
                            req.session.username = user.username;
                            req.session.userMessage ='Logged in Successfully';
                            res.redirect('/');
                        } else {
                            var err = [{msg: "Incorrect Password, please try again"}];
                            res.render('users/login_user', {errors: err});
                            return;
                        }   
                    } else {
                        var err = [{msg: "User does not exist, please register first"}];
                        res.render('users/login_user', {errors: err});
                        return;                        
                    }
                }
            );
        }
    }
];

exports.logout_user = function (req, res) {
        req.session.userMessage ='Logged out Successfully';
        req.session.destroySession = true;
        res.redirect('/users/login_user');    
}