module.exports = (req, res) =>{
    if(req.session.username){
        return res.render("create_post");
    }
    res.redirect('login_user')
}