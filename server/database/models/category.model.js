const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = schema({
    title: {
        type: String,
        minLength: [1,"title is too short"],
        maxLength: [125,"title is too long"],
        unique: true,
        required:true
    },
    description: {
        type: String,
        minLength:[4,"description must be at least 4 characters"],
        required:true
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