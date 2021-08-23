const mongoose = require('mongoose');
const schema = mongoose.Schema;

// TODO: change the message
// Category models
const categorySchema = schema({
    title: {
        type: 'string',
        required:[true, "needs a title"]
    },
    description: {
        type: 'string',
        required:[true , "needs a description"]
    }
})

let Category;

function modelDeclared () {
    try {
        mongoose.model('category')
        return true
    } catch (e) {
        return false
    }
}

if(!modelDeclared()){
    Category = mongoose.model('category',categorySchema)
}else{
    Category = mongoose.model('category')
}

module.exports = Category;