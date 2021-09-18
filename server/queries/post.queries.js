const Post = require('../database/models/post.model')

exports.createPost = async (data) => {
    const newPost = new Post(data);
    return newPost.save();
}

exports.getPosts = async () => {
    return Post.find().populate("category");
}

exports.getPost = async (id) => {
    return Post.findById(id);
}

exports.deletePost = async (id) => {
    return Post.findByIdAndDelete(id).exec();
}

exports.patchPost = async (id,data) => {
    return Post.findByIdAndUpdate(id,{$set:data},{runValidators:true});
}