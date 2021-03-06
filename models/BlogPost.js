const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date_posted: Date,
    date_updated: Date
});

const BlogPost = mongoose.model('BlogPost',BlogPostSchema);

module.exports = BlogPost