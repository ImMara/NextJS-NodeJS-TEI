import {createPage, getPages,} from "../../../server/queries/page.queries";

const fs = require('fs');
const path = require('path');

export default async (req,res,next) =>{
    switch(req.method) {
        case 'POST':
            //TODO: needs regex for title
            try{
                // getting body from request
                const body = req.body;

                // create page in mongodb
                const data = await createPage({...body})

                // create JS file in system for pages
                fs.writeFile(`./pages/${body.title}.js`,
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
                const page = await getPages();

                // RESPONSE FROM API
                res.json({
                    data: page
                })


            }catch (e) {

                // log server with error for dev
                console.error(e);

            }
            break;
    }
}