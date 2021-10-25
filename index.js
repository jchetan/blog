const express = require('express');
const path = require('path');
const ejs = require('ejs')
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost')

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