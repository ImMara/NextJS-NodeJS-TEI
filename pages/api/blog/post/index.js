import {createPost, getPosts} from '../../../../server/queries/post.queries'

export default async (req,res,next) => {
    switch (req.method) {

        case 'GET':
            try {
                //GET ALL POSTS
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

        // TODO: improve message
        case 'POST':
            try {
                // GETTING  BODY WITH DATA
                const body = await req.body;

                // CREATE OBJECT WITH BODY
                const post = body;

                // CREATE DATA IN DATABASE
                await createPost(post);

                // SUCCESS MESSAGE
                const string = `new post success ${body.title}`;

                //  RESPONSE FROM API
                res.json({
                    message:string,
                    data:post
                })

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message});

                // SERVER RETURNS ERROR
                console.error(e.message);

            }
            break;

    }
}