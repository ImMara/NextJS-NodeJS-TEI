const mongoose = require('mongoose');
const schema = mongoose.Schema;

const menuSchema = schema({
    page_id:{
        type:schema.Types.ObjectId,
        ref:"page",
        required: true
    },
    title: {
        type: String,
        minLength: [1,"title is too short"],
        maxLength: [125,"title is too long"],
        unique: true,
        required: true
    },
    parent: {
        type: schema.Types.ObjectId,
        ref:"menu",
    },
})

let Menu;

function modelDeclared () {
    try {
        mongoose.model('menu')
        return true
    } catch (e) {
        return false
    }
}

if(!modelDeclared()){
    Menu = mongoose.model('menu',menuSchema)
}else{
    Menu = mongoose.model('menu')
}

module.exports = Menu;