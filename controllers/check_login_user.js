const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = (req, res) =>{
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