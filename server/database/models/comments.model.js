const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentsSchema = schema({
    body: {
        type: String,
        required:true,
        maxLength:[140,"comments must be under 140 characters"],
        minLength:[3,"comments must be between 10 and 140"]
    },
    email:{
        type: String,
        required:true,
    },
    date: {
        type: Date,
        required: true
    },
    post_id: {
        type:schema.Types.ObjectId,
        ref:"post",
        required: true
    },
    username: {
        type:String,
        required:true,
    }
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