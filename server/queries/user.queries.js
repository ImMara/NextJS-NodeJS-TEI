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
            delete:true
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

    return User.findOne({'local.email': email}).populate('role').exec();

}

exports.findUserPerId = (id) => {

    return User.findOne({ _id:id }).populate('role').exec();

}

// UPDATE USER

exports.findUserAndUpdate = async (id, user, password) => {
    return User.findByIdAndUpdate(id, {
        $set: {
            username: user.username,
            first_name: user.name,
            last_name:user.last_name,
            website:user.website,
            description: user.description,
            address: user.address,
            postalCode: user.postal_code,
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
            first_name: user.name,
            last_name:user.last_name,
            website:user.website,
            description: user.description,
            address: user.address,
            postalCode: user.postal_code,
            local: {
                email: user.email,
                password: hashedPassword
            },
            delete:user.delete
        }
    });
}

exports.updateSpecificFields = async (id,body) =>{

    const user = await User.findById(id);
    let object = {}

    if(body.email){

        if(body.password){
            const hashedPassword = await User.hashPassword(body.password);
            object = {
                ...body,
                local:{
                    password: hashedPassword,
                    email: body.email,
                },
                delete:user.delete
            }
        }else{
            object = {
                ...body,
                local:{
                    ...user.local,
                    email: body.email,
                },
                delete:user.delete
            }
        }

    }else{

        if(body.password) {
            const hashedPassword = await User.hashPassword(body.password);
            object = {
                ...body,
                local: {
                    ...user.local,
                    password: hashedPassword,
                },
                delete: user.delete
            }
        }else{
            object = {...body}
        }

    }

    return User.findByIdAndUpdate(id, {
        $set :object,
    })
}

// ALL USER

exports.findAllUsers = () => {

    return User.find().exec();

}


// DELETE USER

exports.deleteUser = (id) => {

    return User.findByIdAndDelete(id).exec();

}