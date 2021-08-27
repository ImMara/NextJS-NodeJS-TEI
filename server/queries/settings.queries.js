const Settings = require('../database/models/settings.model');

exports.getSettings = async () => {
    return Settings.find();
}

exports.patchSettings = async (id,data) => {
    return Settings.findByIdAndUpdate(id,{$set:data},{runValidators:true});
}