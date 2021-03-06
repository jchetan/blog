const express = require('express');
const ejs = require('ejs')
const mongoose = require('mongoose');
const session = require('express-session');
const keys = require('./config/keys');

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
    loggedIn = req.session.userId;
    console.log(loggedIn);
    next()
});

mongoose.connect(
    keys.mongoURI, 
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log("App listening on port 4000")
})

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var usersRouter = require('./routes/users');
var static_pagesRouter = require('./routes/static_pages');

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.use((req, res) => res.render('static_pages/404error'));