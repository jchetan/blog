const express = require('express');
const ejs = require('ejs')
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

app.set('view engine','ejs');

app.use(session({
    cookie: { maxAge: null },
    secret: 'kjhkhgkjhgkjhgkjgkjh',
    resave: false,
    saveUninitialized: true    
}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.username;
    console.log(loggedIn);
    next()
});


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

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var usersRouter = require('./routes/users');
var static_pagesRouter = require('./routes/static_pages');

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.use((req, res) => res.render('static_pages/404error'));