const BlogPost = require('../models/BlogPost');

module.exports = (req, res) =>{
    BlogPost.findById(req.params.id, (error, blogpost) =>{
        if(req.session.username){
            return res.render('edit_post', {blogpost: blogpost});            
        }
        res.redirect('login_user')        
    })     
}