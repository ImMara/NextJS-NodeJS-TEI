import {deleteMenu, getMenu, getMenuWithParent, patchMenu} from "../../../../../server/queries/menu.queries";

export default async (req, res, next) => {
    switch (req.method) {
        case 'PATCH':
            try{

                // GET ID FROM URL
                const id = req.query.id;

                // GET BODY WITH DATA
                const body = req.body;

                // UPDATE MENU
                const menu = await patchMenu(id,body);

                // MESSAGE
                const string = `mise à jour du menu : ${menu.title}`;

                // RESPONSE FROM API
                res.json({
                    success: string,
                    data:menu
                });

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;
        case 'DELETE':
            try {

                // GET ID FROM URL
                const id = req.query.id;

                // GET MENU WITH ID
                const menu = getMenu(id);

                // DELETE MENU WITH ID
                await deleteMenu(id);

                // SUCCESS MESSAGE
                const string = `Supression du menu : ${menu.title}`

                // JSON RESPONSE
                res.json({
                    success: string
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