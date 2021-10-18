import {createUser, findAllUsers} from "../../../server/queries/user.queries";

export default async (req,res,next) => {
    switch(req.method) {
        case 'GET':
            try{

                // GET ALL USERS
                const users = await findAllUsers();

                // API RESPONSE
                res.json({
                    data:users
                })

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;
        case 'POST':
            try{

                // GETTING BODY WITH DATA
                const body = await req.body;

                // CREATE USER IN DB
                const user = await createUser(body);

                // SUCCESS MESSAGE
                const string =  `Création d'un nouvelle utilisateur : ${user.local.email}`;

                // RESPONSE FROM API
                res.json({
                    success:string,
                    data:user
                })

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;
    }
}