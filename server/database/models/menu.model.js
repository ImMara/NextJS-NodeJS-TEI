const mongoose = require('mongoose');
const schema = mongoose.Schema;

const menuSchema = schema({
    page_id:{ type: 'integer'},
    title: { type: 'string'},
    parent: { type: 'string' },
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