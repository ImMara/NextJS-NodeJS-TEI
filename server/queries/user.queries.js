const User = require('../database/models/user.model');

// CREATE USER

exports.createUser = async (user) => {
    try {

        const hashedPassword = await User.hashPassword(user.password);

        const newUser = new User({
            username: user.username,
            local: {
                email: user.email,
                password: hashedPassword
            },
            role:user.role,
            delete:user.delete
        })

        return newUser.save();

    } catch (e) {

        throw e;

    }
}

// FIND USER

exports.findUser = (id) => {
    return User.findById(id)
}

// FIND USER BY EMAIL

exports.findUserPerEmail = (email) => {

    return User.findOne({'local.email': email}).exec();

}

exports.findUserPerId = (id) => {

    return User.findOne({ _id:id }).exec();

}

// UPDATE USER

exports.findUserAndUpdate = async (id, user, password) => {
    return User.findByIdAndUpdate(id, {
        $set: {
            username: user.username,
            name: user.name,
            phone: user.phone,
            local: {
                email: user.email,
                password: password
            },
            delete:user.delete
        }
    });
}
// UPDATE USER WITH PASSWORD

exports.findUserAndUpdateWithPassword = async (id, user) => {
    const hashedPassword = await User.hashPassword(user.password);
    return User.findByIdAndUpdate(id, {
        $set: {
            username: user.username,
            name: user.name,
            phone: user.phone,
            local: {
                email: user.email,
                password: hashedPassword
            },
            delete:user.delete
        }
    });
}

exports.updateSpecificFields = async (id,body) =>{
    return User.findByIdAndUpdate(id, { $set :{body}})
}

// ALL USER

exports.findAllUsers = () => {

    return User.find().exec();

}


// DELETE USER

exports.deleteUser = (id) => {

    return User.findByIdAndDelete(id).exec();

}