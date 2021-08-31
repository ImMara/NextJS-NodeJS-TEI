const Role = require('../database/models/role.model');

exports.createRole = async (data) => {
    const newRole = new Role(data);
    return newRole.save();
}

exports.getRoles = async () => {
    return Role.find();
}

exports.getRole = async(id) => {
    return Role.findById(id);
}

exports.deleteRole = async(id) => {
    return Role.findByIdAndDelete(id).exec();
}

exports.patchRole = async(id,data) => {
    return Role.findByIdAndUpdate(id,{$set:data},{runValidators:true});
}
