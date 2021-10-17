import {createComment, getComments} from "../../../../server/queries/comments.queries";

export default async (req, res,next) => {
    switch (req.method) {

        case 'GET':
            /// GET ALL COMMENTS
            const comments = await getComments();

            // RESPONSE FROM API
            res.json({
                data:comments
            })
            break;

        case 'POST':
            try {
                // BODY WITH DATA
                const body = req.body;

                const comment = {
                    body:body.body,
                    post_id:body.post_id,
                    date:Date.now(),
                    email:body.email,
                    username:body.username,
                }

                // CREATE OBJECT IN DATABASE
                const newComment = await createComment(comment);

                // SUCCESS MESSAGE
                const string = `new comment success ${body.username}`;

                // RESPONSE FROM API
                res.json({
                    message: string,
                    data: body,
                })

            }catch (e) {

                // API RETURNS ERROR
                res.json({error: e})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;

    }
}