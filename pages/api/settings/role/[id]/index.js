import {deleteRole, getRole, patchRole} from "../../../../../server/queries/role.queries";


export default async (req, res, next) => {
    switch (req.method) {
        case 'GET':
            try {

                // GET ID FROM URL
                const id = req.query.id;

                // GET ROLE WITH ID
                const role = await getRole(id);

                // RESPONSE FROM API
                res.json({
                    data:role
                });

            } catch (e) {

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
                const body = req.body;

                // UPDATE ROLE
                const role = await patchRole(id,body);

                // MESSAGE
                const string = `mise à jour du rôle : ${role.title}`

                // RESPONSE FROM API
                res.json({
                    message: string,
                    data:role
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

                const role = await getRole(id);

                // DELETE ROLE WITH ID
                await deleteRole(id);

                // SUCCESS MESSAGE
                const string = `Supression du rôle : ${role.title}`

                // JSON RESPONSE
                res.json({success: string,})

            }catch (e) {

                // API RETURNS ERROR
                res.json({error: e})

                // SERVER RETURNS ERROR
                console.error(e)

            }
    }
}