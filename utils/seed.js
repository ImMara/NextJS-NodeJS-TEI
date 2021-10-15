const mongoose = require('mongoose');
const {createRole} = require("../server/queries/role.queries");
const {createUser} = require("../server/queries/user.queries");
const {createSettings} = require("../server/queries/settings.queries");


// TODO: replace with env for connect - stop connection after request
mongoose
    .connect(
    `mongodb+srv://dbuser:gjKKcU6ksto8xGty@cluster0.sg4pv.mongodb.net/nodepress?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then( async () => {
        console.log('MongoDB Connected')
        const newSettings = await createSettings({
            title:process.env.SETTINGS_TITLE,
            email:process.env.SETTINGS_TITLE,
            url:process.env.SETTINGS_TITLE,
            slogan:process.env.SETTINGS_TITLE,
            comments:process.env.SETTINGS_TITLE
        })
        const adminRole = await createRole({
            title:"admin",
            access:["blog","page","menu","users","settings"],
            delete:false
        })
        const userRole = await createRole({
            title:"user",
            access:[],
            delete:false
        })
        const newUser = await createUser({
            username:process.env.USERNAME,
            password:process.env.PASSWORD,
            email:process.env.EMAIL,
            role:adminRole._id,
            delete: false,
        })
    })
    .catch(err => console.log(err));