const Comments = require('../database/models/comments.model')

exports.createComment = async (data) => {
    return new Comments(data).save();
}

exports.getComments = async () => {
    return Comments.find();
}

exports.getComment = async (id) => {
    return Comments.findById(id);
}

exports.deleteComment = async (id) => {
    return Comments.findByIdAndDelete(id).exec();
}

exports.patchComment = async (id,data) => {
    return Comments.findByIdAndUpdate(id,{$set:data},{runValidators:true});
}
