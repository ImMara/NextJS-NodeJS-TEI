import {createPost, getPosts} from '../../../../server/queries/post.queries'
const path = require("path");
const sharp = require('sharp');
const fs = require('fs');

export default async (req,res,next,error) => {
    switch (req.method) {

        case 'GET':
            try {
                // GET ALL POSTS
                const post = await getPosts();

                // API RESPONSE
                res.json({
                    data:post
                })

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message});

                // SERVER RETURNS ERROR
                console.error(e.message);

            }
            break;

        case 'POST':
            try {
                // GETTING  BODY WITH DATA
                const body = await req.body;

                // GETTING USER FROM AUTH
                const user = req.user;

                if (req.file) {

                    const {filename: image} = req.file;
                    await sharp(req.file.path)
                        .resize(800)
                        .webp({quality: 90})
                        .toFile(path.resolve(req.file.destination, "resized", image))
                    fs.unlinkSync(req.file.path);

                    await createPost({
                        ...body,
                        author:user._id,
                        image: req.file.filename,
                        date:Date.now(),
                    })

                }

                // SUCCESS MESSAGE
                const string = `Création d'un nouvelle article :  ${body.title}`;

                //  RESPONSE FROM API
                res.json({
                    success:string,
                })

            } catch (e) {

                if (req.file) {
                    const {filename: image} = req.file;
                    fs.unlinkSync(path.resolve(req.file.destination, "resized", image))
                }

                // API RETURNS ERROR
                res.json({error: e.message});

                // SERVER RETURNS ERROR
                console.error(e.message);
            }
            break;

    }
}