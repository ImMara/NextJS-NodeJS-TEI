const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = schema({
    title: {
        type: String,
        minLength: [1,"title is too short"],
        maxLength: [125,"title is too long"],
        unique: true,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    author: {
        type: schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    category: {
        type: schema.Types.ObjectId,
        ref:"category",
        required: true
    },
    image: {
        type: String
    },
    short_description: {
        type: String,
        minLength:[10,"short description must be at least 10 characters"],
        maxLength:[125,"short description is too long"],
        required: true
    },
    body: {
        type: String,
        minLength:[50,"body must be at least 50 characters"],
        required: true
    },
    status: {
        type: Boolean
    },
    allowComment: {
        type: Boolean
    },
})

let Post;

function modelDeclared () {
    try {
        mongoose.model('post')
        return true
    } catch (e) {
        return false
    }
}

if(!modelDeclared()){
    Post = mongoose.model('post',postSchema)
}else{
    Post = mongoose.model('post')
}

module.exports = Post;