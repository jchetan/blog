const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register_new_user = function (req, res) {
    res.render('users/register_new_user');
}

exports.save_new_user = function (req, res) {
    var date_time = new Date();
    //check if email is in correct format and non null
    //check if password is non null
    //if there are any errors, update errors variable in session 
    //Redirect user to register page
    User.findOne(
        {
            username: req.body.username
        },
        function (err, user) {
            if (user) {
                console.log("user exists");
                res.redirect('/user_exists_message');                
            } else {
                const hashedPassword = bcrypt.hashSync(req.body.password, 10);
                User.create(
                    {
                        username: req.body.username,
                        password: hashedPassword,
                        date_account_created: date_time.toJSON().slice(0,19).replace('T',':'),                
                    }, (error, blogpost) => {
                        res.redirect('/user_registered_confirmation_message');
                    }
                ); 
            }
        }
    );
}

exports.login_user = function (req, res) {
    res.render('users/login_user');
}

exports.validate_login_user = function (req, res) {
    //find if user exists
    console.log(req.body.username);
    User.findOne(
        {
            username: req.body.username
        },
        function (err, user) {
            if (user) {                
                const result = bcrypt.compareSync(req.body.password, user.password)                 
                if (result) {                    
                    req.session.username = user.username;
                    req.session.save();
                    console.log(req.session);
                    res.redirect('/correct_password_message');
                } else {
                    res.redirect('/wrong_password_message');
                }   
            } else {
                res.redirect('/user_not_exist_message');
            }
        }
    );
}

exports.logout_user = function (req, res) {
    req.session.destroy(() =>{
        res.redirect('/')
    })
}