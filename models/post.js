const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: { type: String, required: true },
    title: String,
    content: { type: String, required: true }
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

module.exports = Post;

