const Menu = require('../database/models/menu.model');

exports.createMenu = async (data) => {
    const newMenu = new Menu(data);
    return newMenu.save();
}

exports.getMenus = async () => {
    return Menu.find();
}

exports.getMenu = async (id) => {
    return Menu.findById(id);
}

exports.deleteMenu = async (id) => {
    return Menu.findByIdAndDelete(id).exec();
}

exports.patchMenu = async (id,data) => {
    return Menu.findByIdAndUpdate(id,{$set:data},{runValidators:true});
}