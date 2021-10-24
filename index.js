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

app.get('/',(req,res)=>{

    res.render('index');
    /*
    BlogPost.find(
        {},
        (error, blogposts) => {
            console.log(blogposts);
            res.render('index', {blogposts: blogposts});
        }
    );      
    */
})

app.get('/all_posts',(req,res)=>{   
    BlogPost.find(
        {},
        (error, blogposts) => {
            console.log(blogposts);
            res.render('all_posts', {blogposts: blogposts});
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
        res.render('view_post', {blogpost: blogpost});
        console.log(error,blogpost)
    })    
})

app.get('/posts/new',(req,res)=>{
    res.render('create_post')
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

app.get('/edit_post/:id',(req,res)=>{
    BlogPost.findById(req.params.id, (error, blogpost) =>{
        res.render('edit_post', {blogpost: blogpost});
        console.log(error,blogpost)
    })      
})

app.post(
    '/save_post/:id',
    (req,res)=>{
        var date_time = new Date();
        console.log(req.params.id);
        console.log(req.body.blog_title);
        console.log(req.body.blog_content);
        BlogPost.findByIdAndUpdate(
            req.params.id, 
            {
                title: req.body.blog_title,
                body: req.body.blog_content,
                date_updated: date_time.toJSON().slice(0,19).replace('T',':')
            },
            (error, blogpost) =>{
                console.log(error,blogpost)
            }
        ) 
        res.redirect('/');
    }
);