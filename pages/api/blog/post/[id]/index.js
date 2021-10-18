import {createPost, deletePost, getPost, patchPost} from "../../../../../server/queries/post.queries";
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
                const body = await req.body;

                // GET POST WITH ID
                const post = await getPost(id);

                // UPDATE POST
                if(req.file){

                    await fs.unlink(path.join(__dirname, `../../../../../../public/images/blogs/resized/${post.image}`), (err => err && console.error(err)))

                    const {filename: image} = req.file;
                    await sharp(req.file.path)
                        .resize(800)
                        .webp({quality: 90})
                        .toFile(path.resolve(req.file.destination, "resized", image))
                    fs.unlinkSync(req.file.path);

                    await patchPost(id,{
                        ...body,
                        image: req.file.filename,
                    })

                }
                if(req.file === undefined){
                    await patchPost(id,{
                        ...body, image:post.image
                    })
                }

                // MESSAGE
                const string = `mise à jour de l'article : ${post.title}`

                // RESPONSE FROM API
                res.json({
                    success: string,
                })

            } catch (e) {

                if (req.file) {
                    const {filename: image} = req.file;
                    fs.unlinkSync(path.resolve(req.file.destination, "resized", image))
                }

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

                await fs.unlink(path.join(__dirname, `../../../../../../public/images/blogs/resized/${post.image}`), (err => err && console.error(err)))

                // DELETE POST WITH ID
                await deletePost(id);

                // SUCCESS MESSAGE
                const string = `Supression de l'article : ${post.title}`;

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