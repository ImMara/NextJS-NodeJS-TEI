const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentsSchema = schema({

})

let Comments;

function modelDeclared () {
    try {
        mongoose.model('comments')
        return true
    } catch (e) {
        return false
    }
}

if(!modelDeclared()){
    Comments = mongoose.model('comments',commentsSchema)
}else{
    Comments = mongoose.model('comments')
}

module.exports = Comments;