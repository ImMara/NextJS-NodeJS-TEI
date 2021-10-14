import {deletePost, getPost, patchPost} from "../../../../../server/queries/post.queries";
const path = require("path");
const sharp = require('sharp');
const fs = require('fs');

export default async (req, res, next) => {
    switch (req.method) {

        // TODO: improve comments
        case 'GET':
            try{

                // GET ID FROM URL
                const id = req.query.id;

                // GET POST WITH ID
                const post = await getPost(id);

                // RESPONSE FROM API
                res.json({
                    data:post
                })

            }catch (e) {

                // API RETURNS ERROR
                res.json({error: e})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;

        // TODO: change success message
        case 'PATCH':

            try{
                // GET ID FROM URL
                const id = req.query.id;

                // GET BODY WITH DATA
                const body = req.body;

                // GET POST WITH ID
                const post = await getPost(id);

                // UPDATE POST
                await patchPost(id,body);

                // MESSAGE
                const string = `Update success`

                // RESPONSE FROM API
                res.json({
                    success: string,
                })

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;

        case 'DELETE':
            try {
                // GET ID FROM URL
                const id = req.query.id;

                // GET POST WITH ID
                const post = await getPost(id);

                fs.unlink(path.join(__dirname, `../../../../../../public/images/blogs/resized/${post.image}`), (err => err && console.error(err)))

                // DELETE POST WITH ID
                await deletePost(id);

                // SUCCESS MESSAGE
                const string = `Delete success`;

                // JSON RESPONSE
                res.json({success: string})

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;
    }
}