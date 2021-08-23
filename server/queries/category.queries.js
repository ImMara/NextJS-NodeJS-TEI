const Category = require('../database/models/category.model');

// CREATE CATEGORY

exports.createCategory = async (cat) => {
    const newCategory = new Category(cat);
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

