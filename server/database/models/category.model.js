const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = schema({
    title: {type: 'string'},
    slug: {type: 'string'},
    description: {type: 'string'}
})

let Category;

function modelDeclared () {
    try {
        mongoose.model('role')
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