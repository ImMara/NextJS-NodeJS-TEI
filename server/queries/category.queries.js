const Category = require('../database/models/category.model');

exports.createCategory = async (data) => {
    const newCategory = new Category(data);
    return newCategory.save();
}

exports.getCategories = async () => {
    return Category.find();
}

exports.getCategory = async (id) => {
    return Category.findById(id);
}

exports.deleteCategory = async (id) => {
    return Category.findByIdAndDelete(id).exec();
}

exports.patchCategory = async (id,data) => {
    return Category.findByIdAndUpdate(id,{$set:data},{runValidators:true});
}

