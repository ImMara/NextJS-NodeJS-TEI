const Comments = require('../database/models/comments.model')

exports.createComment = async (data) => {
    const newComment = new Comments(data);
    return newComment.save();
}

exports.getComments = async () => {
    return Comments.find().populate('post_id','title').sort({"date":-1});
}

exports.getComment = async (id) => {
    return Comments.findById(id);
}

exports.getCommentsPost = async (id) => {
    return Comments.find({"post_id":id}).populate("post_id","title").sort({"date":-1});
}

exports.deleteComment = async (id) => {
    return Comments.findByIdAndDelete(id).exec();
}

exports.patchComment = async (id,data) => {
    return Comments.findByIdAndUpdate(id,{$set:data},{runValidators:true});
}
