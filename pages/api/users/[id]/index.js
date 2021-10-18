import {
    deleteUser,
    findUser, findUserAndUpdate,
    findUserAndUpdateWithPassword,
    updateSpecificFields
} from "../../../../server/queries/user.queries";

export default async(req,res,next) => {
    switch(req.method) {
        case 'GET':
            try{

                // GET ID FROM URL
                const id = req.query.id;

                // GET USER WITH ID
                const user = await findUser(id);

                // RESPONSE FROM API
                res.json({
                    data:user
                })

            }catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;
        case 'PATCH':
            try{

                // GET ID FROM URL
                const id = req.query.id;

                // GET BODY WITH DATA
                const body = await req.body;

                // UPDATE USER
                const updated = await updateSpecificFields(id,body);

                // MESSAGE
                const string = `mise à jour de l'utilisateur : ${updated.username}`

                // RESPONSE FROM API
                res.json({
                    success: string,
                    data:updated
                })

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;
        case 'DELETE':
            try{

                // GET ID FROM URL
                const id = req.query.id;

                // DELETE USER WITH ID
                await deleteUser(id);

                // SUCCESS MESSAGE
                const string = `Supression de l'utilisateur : ${id}`

                // JSON RESPONSE
                res.json({success: string,})

            }catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;
    }
}