const mongoose = require('mongoose');
const schema = mongoose.Schema;

const settingsSchema = schema({
    title:{type: String},
    email:{type: String},
    url:{type: String},
    defaultRoles: {type: String},
    slogan: {type: String},
    comments : {type: Boolean},
})

let Settings;

function modelDeclared () {
    try {
        mongoose.model('settings')
        return true
    } catch (e) {
        return false
    }
}

if(!modelDeclared()){
    Settings = mongoose.model('settings',settingsSchema);
}else{
    Settings = mongoose.model('settings');
}

module.exports = Settings;