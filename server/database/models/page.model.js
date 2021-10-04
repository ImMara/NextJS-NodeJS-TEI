const mongoose = require('mongoose');
const schema = mongoose.Schema;

const pageSchema = schema({
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
    slug: {
        type: String,
        unique: true,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    editable: {
        type: Boolean,
        default: true,
    }
})

let Page;

function modelDeclared () {
    try {
        mongoose.model('page')
        return true
    } catch (e) {
        return false
    }
}

if(!modelDeclared()){
    Page = mongoose.model('page',pageSchema)
}else{
    Page = mongoose.model('page')
}

module.exports = Page;