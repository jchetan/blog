module.exports = (req, res) =>{
    console.log(req.session);
    console.log(req.session.username);
    if(req.session.username){
        return res.render("create_post");
    }
    res.redirect('login_user')
}