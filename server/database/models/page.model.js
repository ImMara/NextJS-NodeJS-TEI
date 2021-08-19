const mongoose = require('mongoose');
const schema = mongoose.Schema;

const pageSchema = schema({
    title: { type: 'string'},
    date: { type: 'string'},
    statics: {type: 'string'},
    slug: { type: 'string'},
    image: { type: 'string'},
    layout: { type: 'string'},
    body: { type: 'object'}
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