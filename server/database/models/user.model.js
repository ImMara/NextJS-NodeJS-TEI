const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bcrypt = require('bcryptjs');
const {getRoles} = require("../../queries/role.queries");

const userSchema = schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    first_name: {
        type: String,
    },
    last_name:{
        type: String,
    },
    website:{
        type: String,
    },
    description: {
        type: String,
    },
    address: {
        type: String,
    },
    postalCode: {
        type: Number,
    },
    role : {
        type: schema.Types.ObjectId,
        ref:"role",
        required: true,
        default:"user"
    },
    local: {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required:true
        },
    },
    delete:{
        type:Boolean,
        default:true,
    }

})

userSchema.statics.hashPassword = async (password) => {

    return await bcrypt.hash(password, 12);

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