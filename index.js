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

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("App listening on port 3000")
})

app.get('/',(req,res)=>{
    BlogPost.find(
        {},
        (error, blogposts) => {
            console.log(blogposts);
            res.render('index', {blogposts: blogposts});
        }
    );    
})

app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/contact',(req,res)=>{
    res.render('contact');
})

app.get('/post/:id',(req,res)=>{
    BlogPost.findById(req.params.id, (error, blogpost) =>{
        res.render('post', {blogpost: blogpost});
        console.log(error,blogpost)
    })    
})

app.get('/posts/new',(req,res)=>{
    res.render('create')
})

app.post('/posts/store',(req,res)=>{
    var date_time = new Date();
    BlogPost.create(
        {
            title: req.body.blog_title,
            body: req.body.blog_content,
            date_posted: date_time.toJSON().slice(0,19).replace('T',':'),
            date_updated: date_time.toJSON().slice(0,19).replace('T',':')
        }, (error, blogpost) => {
            res.redirect('/')
        }
    );    
})    

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