import {deleteComment, getComment, patchComment} from "../../../../../server/queries/comments.queries";


export default  async (req,res,next) => {
    switch (req.method) {

        // TODO: change success messages
        case 'GET':
            try{

                // GET ID FROM URL
                const id = req.query.id;

                // GET COMMENT WITH ID
                const comment = await getComment(id);

                // RESPONSE FROM API
                res.json({
                    data:comment
                })

            }catch (e) {

                // API RETURNS ERROR
                res.json({error: e})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;

        case 'PATCH':
            try {

                // GET ID FROM URL
                const id = req.query.id;

                // GET BODY WITH DATA
                const body = req.body;

                // GET COMMENT WITH ID
                const comment = await getComment(id);

                /// UPDATE COMMENT
                await patchComment(id,body);

                // MESSAGE
                const string = `mise à jour du commentaire ${comment.title}`

                // RESPONSE FROM API
                res.json({
                    message: string,
                    data:body
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

                // GET COMMENT WITH ID
                const comment = await getComment(id);

                // DELETE COMMENT WITH ID
                await deleteComment(id);

                // SUCCESS MESSAGE
                const string = `Supression du commentaire ${id}`

                // JSON RESPONSE
                res.json({
                   success: string
                })

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;

    }
}