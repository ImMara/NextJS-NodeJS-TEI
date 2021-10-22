import {createPage, getPages,} from "../../../server/queries/page.queries";
import {slugify} from "../../../utils/functions";

const fs = require('fs');
const path = require('path');

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

                const string = `Création d'une nouvelle page : ${slug}`;

                // return json for success messages
                return res.json({
                    success: string,
                    data: data,
                })

            } catch (e) {

                // if error return json with error
                res.json({
                    error: e.message,
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