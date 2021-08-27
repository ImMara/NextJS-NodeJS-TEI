const mongoose = require('mongoose');
const schema = mongoose.Schema;

const settingsSchema = schema({
    title:{type: 'string'},
    email:{type: 'string'},
    url:{type: 'string'},
    defaultRoles: {type: 'string'},
    slogan: {type: 'string'},
    comments : {type: 'boolean'},
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

const S = new Settings;
S.title = "nodepress";
S.email = "nodepress@gmail.com";
S.url = "http://localhost:3000/";
S.defaultRoles="admin";
S.slogan="open source node js CMS";
S.comments=false;

module.exports = Settings;