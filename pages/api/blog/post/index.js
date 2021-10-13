import {createPost, getPosts} from '../../../../server/queries/post.queries'

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

                // CREATE DATA IN DATABASE
                await createPost({
                    ...body,
                    author:user._id,
                    date:Date.now(),
                })

                // SUCCESS MESSAGE
                const string = `new post success ${body.title}`;

                //  RESPONSE FROM API
                res.json({
                    success:string,
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