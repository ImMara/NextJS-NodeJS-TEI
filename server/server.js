const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const fs = require("fs");
const {ensureRoleAllowsSettings} = require("./config/security.config");
const {ensureRoleAllowsUsers} = require("./config/security.config");
const {ensureRoleAllowsMenu} = require("./config/security.config");
const {ensureRoleAllowsPage} = require("./config/security.config");
const {ensureRoleAllowsBlog} = require("./config/security.config");
const {ensureAuthenticated} = require("./config/security.config");
const {uploadBlogs} = require('./config/multer.config')
const bodyParser = require("body-parser");
const path = require("path");
const multer = require('multer');
const https = require('https');
const http = require("http");

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev , quiet:true });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        // Connect to database
        require('./database');

        // Create server express and export to use it in different files
        const server = express();
        exports.server = server;

        server.use(bodyParser.json({limit:"50mb"}))
        server.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

        // Cookie parser to allow token in cookies
        server.use(cookieParser());

        // Setup token strategy  to connect
        require('./config/jwt.config');

        server.get('/np-admin/blog',ensureAuthenticated,ensureRoleAllowsBlog,(req, res, next) => {
            return handle(req, res, next);
        })

        server.get('/np-admin/page',ensureAuthenticated,ensureRoleAllowsPage,(req, res, next) => {
            return handle(req, res, next);
        })

        server.get('/np-admin/menu',ensureAuthenticated,ensureRoleAllowsMenu,(req, res, next) => {
            return handle(req, res, next);
        })

        server.get('/np-admin/users',ensureAuthenticated,ensureRoleAllowsUsers,(req, res, next) => {
            return handle(req, res, next);
        })

        server.get('/np-admin/settings',ensureAuthenticated,ensureRoleAllowsSettings,(req, res, next) => {
            return handle(req, res, next);
        })

        // Using security on all page under admin
        server.get('/np-admin/*' , ensureAuthenticated, (req,res,next)=>{
            return handle(req,res,next);
        })

        // All pages handle by nextJS
        server.get('*' , (req,res,next) =>{
            return handle(req,res,next);
        })

        server.post('/api/blog/post/',async(req,res,next) =>{
            try {
                await uploadBlogs.single("image")(req, res, async function (err) {
                    if (err instanceof multer.MulterError) {
                        return res.json({error: "Max file size 2MB allowed!"});
                    } else if (err) {
                        return res.json({error: "Extension must be jpg,png,gif,jpeg"})
                    } else if (!req.file) {
                        return res.json({error: "file is required"})
                    } else{
                        console.log(1, "call")
                        return await handle(req, res, next);
                    }
                })
            }catch (e) {
                console.log(e);
                res.status(400);
            }
        })

        // Post auth informations
        // To disable security connections to this specific path
        server.post('/api/auth/*', (req,res,next)=>{
            return handle(req,res,next);
        })

        // All route and handle by nextJS under security middleware
        server.post('*', ensureAuthenticated, (req,res,next)=>{
            return handle(req,res,next);
        })

        // All route and handle by nextJS under security middleware
        server.put('*', ensureAuthenticated, (req,res,next)=>{
            return handle(req,res,next);
        })

        // All patch route and handle by nextJS under security middleware
        server.patch('*', ensureAuthenticated, (req,res,next) =>{
            return handle(req,res,next);
        })

        // All delete route and handle by nextJS under security middleware
        server.delete('*' ,ensureAuthenticated, (req,res,next) =>{
            return handle(req,res,next);
        })

        // create server and listen the port
        // throw err if wrong configuration
        // url of server

        server.listen(3000, (err)=>{
            if (err) throw err;
            console.log('> Ready on http://localhost:80');
        })
    })