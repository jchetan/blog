const express = require('express');
const ejs = require('ejs')
const mongoose = require('mongoose');

const app = express();

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect(
    'mongodb+srv://jchetan:vatja123@cluster0.sgaf5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    { useNewUrlParser : true, useUnifiedTopology: true }
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once(
    "open", 
    function () {
        console.log("Connected to MongoDB successfully");
    }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("App listening on port 3000")
})

const index_page_Controller = require('./controllers/index_page');
app.get('/',index_page_Controller);

const about_page_Controller = require('./controllers/about_page');
app.get('/about',about_page_Controller);

const contact_page_Controller = require('./controllers/contact_page');
app.get('/contact',contact_page_Controller);

const view_post_Controller = require('./controllers/view_post');
app.get('/view_post/:id',view_post_Controller);

const create_post_Controller = require('./controllers/create_post');
app.get('/create_post',create_post_Controller);

const save_new_post_Controller = require('./controllers/save_new_post');
app.post('/create_post',save_new_post_Controller);

const edit_post_Controller = require('./controllers/edit_post');
app.get('/edit_post/:id',edit_post_Controller);

const save_post_Controller = require('./controllers/save_post');
app.post('/save_post/:id',save_post_Controller);  

app.get('/save_post_confirmation_message',(req,res)=>{
    res.render('show_confirmation_message', {message: "Post Saved Successfully"});              
});

app.get('/create_post_confirmation_message',(req,res)=>{
    res.render('show_confirmation_message', {message: "Post Created Successfully"});              
});

const register_user_Controller = require('./controllers/register_user');
app.get('/register_user',register_user_Controller);  

const save_new_user_Controller = require('./controllers/save_new_user');
app.post('/register_user',save_new_user_Controller); 

app.get('/user_registered_confirmation_message',(req,res)=>{
    res.render('show_confirmation_message', {message: "User Registered Successfully"});              
});

const login_user_Controller = require('./controllers/login_user');
app.get('/login_user',login_user_Controller);  

const check_login_user_Controller = require('./controllers/check_login_user');
app.post('/login_user',check_login_user_Controller); 

app.get('/user_not_exist_message',(req,res)=>{
    res.render('show_confirmation_message', {message: "User does not exist. Please Register"});              
});

app.get('/correct_password_message',(req,res)=>{
    res.render('show_confirmation_message', {message: "Correct Password"});              
});

app.get('/wrong_password_message',(req,res)=>{
    res.render('show_confirmation_message', {message: "Wrong Password"});              
});

app.get('/user_exists_message',(req,res)=>{
    res.render('show_confirmation_message', {message: "User already registered"});              
});