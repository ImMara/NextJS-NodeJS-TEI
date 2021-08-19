const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const userSchema = schema({

    username: {
        type: String,
        required: [true, "L'utilisateur doit avoir un nom/pseudo"],
        unique: true,
    },
    firstName: {
      type: String,
    },
    lastName:{
      type: String,
    },
    website:{
      type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    address: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    country: {
        type: String,
    },
    phoneNumber: {
      type: String,
    },
    role : {
      type: String,
    },
    local: {
        email: {type: String, required: [true, "L'utilisateur doit avoir un email"], unique: true},
        password: {type: String},
    }

})

userSchema.statics.hashPassword = (password) => {

    return bcrypt.hash(password, 12);

}

userSchema.methods.comparePassword = function (password) {

    return bcrypt.compare(password, this.local.password)

}

let User;

function modelDeclared () {
    try {
        mongoose.model('user')
        return true
    } catch (e) {
        return false
    }
}

if(!modelDeclared()){
    User = mongoose.model('user',userSchema)
}else{
    User = mongoose.model('user')
}

module.exports = User;