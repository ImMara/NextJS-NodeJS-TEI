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
            title:"NodePress",
            email:"nodepress@gmail.com",
            url:"localhost",
            slogan:"open source node js cms",
            comments:false
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
            username:"admin",
            password:"admin",
            email:"admin@admin.com",
            role:adminRole._id,
            delete: false,
        })
    })
    .catch(err => console.log(err));