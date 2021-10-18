import {createPage, getPages,} from "../../../server/queries/page.queries";

const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

export default async (req, res, next) => {
    switch (req.method) {
        case 'POST':
            try {
                // getting body from request
                const body = req.body;

                // transform title into slug
                const slug = slugify(body.title);

                // create page in mongodb
                const data = await createPage({...body, slug: slug, date:Date.now()});

                // create JS file in system for pages
                fs.writeFile(`./pages/${slug}.js`,
`
import React from 'react';
import {getPage} from "../server/queries/page.queries";
import {hydration} from "../utils/hydration";
import Navbar from "../templates/components/Navbar/Navbar";
import BasicLayout from "../templates/layouts/BasicLayout";

export async function getStaticProps(context) {

    const id = "${data._id}";
    // get all CategoriesWidget from db
    const page = await getPage(id);

    return {
        // cleaning the object as json for nextJS hydrate security
        props: {page: hydration(page)}, // will be passed to the page component as props
        }
    }
    function ${slug.replace(/-/, '').replace(/’/,'').replace(/'/,'')}(props) {
        function createMarkup() {
            return {
                __html: props.page.body
            };
        }

    return (
        <>
            <Navbar/>
            <BasicLayout>
                <div className="container text-white" dangerouslySetInnerHTML={createMarkup()}>
    
                </div>
            </BasicLayout>
        </>
    );
}

export default ${slug.replace(/-/, '').replace(/’/,'').replace(/'/,'')};
`
                    , (err) => {
                        if (err) throw err;
                        console.log('page build done!');
                    })

                const string = "add page success";

                // return json for success messages
                return res.json({
                    success: string,
                    data: data,
                })

            } catch (e) {

                // if error return json with error
                res.json({
                    status: e
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


            } catch (e) {

                // log server with error for dev
                console.error(e);

            }
            break;
    }
}