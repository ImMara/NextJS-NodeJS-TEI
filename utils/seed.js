const mongoose = require('mongoose');
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
    .then(() => {
        console.log('MongoDB Connected')
        const newSettings = createSettings({
            title:'NodePress',
            email:"nodepress@gmail.com",
            url:"http://localhost:3000/",
            defaultRoles:"admin",
            slogan:"open source node js CMS",
            comments:false
        })
    })
    .catch(err => console.log(err));