const mongoose = require('mongoose');
const schema = mongoose.Schema;

const settingsSchema = schema({
    title:{
        type: String,
        minLength: [1,"title is too short"],
        maxLength: [125,"title is too long"],
        unique: true,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    slogan: {
        type: String,
        minLength: [10,"slogan is too short"],
        maxLength: [200,"slogan is too long"],
        required: true
    },
    comments : {
        type: Boolean
    },
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