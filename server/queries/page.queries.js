const Page = require('../database/models/page.model');

exports.createPage = async (data) => {
    const newPage = new Page(data);
    return newPage.save();
}

exports.getPages = async (data) => {
    return Page.find();
}

exports.getPage = async (id) => {
    return Page.findById(id);
}

exports.deletePage = async (id) => {
    return Page.findByIdAndDelete(id);
}

exports.patchPage = async (id, data) => {
    return Page.findByIdAndUpdate(id, {$set: data},{runValidators:true});
}