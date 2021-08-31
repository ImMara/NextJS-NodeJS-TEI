import {getRole, patchRole} from "../../../../../server/queries/role.queries";


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

                // GET ROLE WITH ID
                const role = await getRole(id);

                // UPDATE ROLE
                await patchRole(id,body);

                // MESSAGE
                const string = `Update success`

                // RESPONSE FROM API
                res.json({
                    message: string,
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