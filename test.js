const mongoose = require('mongoose')

const BlogPost = require('./models/BlogPost')

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

var date_time = new Date();
/*
BlogPost.create(
    {
        title: 'Second Post',
        body: `Second post contents go here`,
        date_posted: date_time.toJSON().slice(0,19).replace('T',':')
    }, (error, blogpost) => {
    console.log(error,blogpost)
    }
);


BlogPost.find({}, (error, blogposts) => {
    console.log(error,blogposts)
});


BlogPost.findById('617578e349850f3b70aeb642', (error, blogpost) =>{
    console.log(error,blogpost)
})  
*/ 

BlogPost.findByIdAndUpdate(
    '617578e349850f3b70aeb642', 
    {
        title: `The Mythbuster's Guide: By Chetan`
    },
    (error, blogpost) =>{
        console.log(error,blogpost)
    }
) 

BlogPost.findByIdAndDelete('617578e349850f3b70aeb642', (error, blogpost) =>{
    console.log(error,blogpost)
}) 