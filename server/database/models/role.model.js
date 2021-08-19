const mongoose = require('mongoose');
const schema = mongoose.Schema;

const roleSchema = schema({

})

let Role;

function modelDeclared () {
    try {
        mongoose.model('role')
        return true
    } catch (e) {
        return false
    }
}

if(!modelDeclared()){
    Role = mongoose.model('role',roleSchema)
}else{
    Role = mongoose.model('role')
}

module.exports = Role;