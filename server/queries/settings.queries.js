const Settings = require('../database/models/settings.model');

exports.createSettings = async (data) => {
    const newSettings = new Settings(data);
    return newSettings.save();
}

exports.getSettings = async () => {
    return Settings.find();
}

exports.patchSettings = async (id,data) => {
    return Settings.findByIdAndUpdate(id,{$set:data},{runValidators:true});
}