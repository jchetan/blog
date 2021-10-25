const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = (req, res) =>{
    var date_time = new Date();
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