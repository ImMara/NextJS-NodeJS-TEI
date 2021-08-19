const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

export default async (req,res,next) =>{
    switch(req.method) {
        case 'POST':
            try{
                // getting body from request
                const body = req.body;

                // transform title into slug
                const slug = slugify(body.title,{
                    lower:true,
                    strict:true
                })

                // create page in mongodb
                const data = await createPage({...body,slug:slug})

                // create JS file in system for pages
                fs.writeFile(`./pages/${slug}.js`,
                    `import React from 'react';
                            function ${body.title.replace(/\s/g, '')}(props) {
                                return (
                                    <div>
                                        <h1>${body.title}</h1>
                                        <p>${body.content}</p>
                                    </div>
                                );
                            }
                            export default ${body.title.replace(/\s/g, '')};`
                    , (err) => {
                        if (err) throw err;
                        console.log('page build done!');
                    })

                // return json for success messages
                return res.json({
                    status:200,
                    data: data,
                })

            }catch (e) {

                // if error return json with error
                res.json({
                    status:e
                })

                // log server with error for dev
                console.error(e)
            }
            break;
        case 'GET':
            try {

                // server request to find pages


            }catch (e) {

                // log server with error for dev
                console.error(e);

            }
            break;
    }
}