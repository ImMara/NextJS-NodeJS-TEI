import {createRole, getRoles} from "../../../../server/queries/role.queries";


export default async (req, res, next) => {
    switch (req.method) {
        case 'GET':
            try{
                // GET ALL ROLES
                const role = await getRoles();

                // API RESPONSE
                res.json({
                    data:role
                })

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;

            // TODO: improve message
        case 'POST':
            try{
                // GETTING BODY WITH DATA
                const body = await req.body;

                // CREATE DATA IN DATABASE
                await createRole(body);

                // SUCCESS MESSAGE
                const string = `new role success ${body.title}`

                // RESPONSE FROM API
                res.json({
                    message:string,
                    data:body
                })

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message})

                // SERVER RETURNS ERROR
                console.error(e)

            }
    }
}