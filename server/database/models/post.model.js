const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = schema({
    title: { type: 'string'},
    date: { type: 'string'},
    user: { type: 'string'},
    category: { type: 'string'},
    image: { type: 'string'},
    short_description: { type: 'string'},
    comments: { type: 'string'},
    body: { type: 'string'},
    status: { type: 'string'},
    allowComment: { type: 'boolean'},
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