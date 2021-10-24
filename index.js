const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.listen(3000,()=>{
    console.log("App listening on port 3000")
})

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
})

app.get('/about',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
})

app.get('/contact',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
})

app.get('/post',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
})
    