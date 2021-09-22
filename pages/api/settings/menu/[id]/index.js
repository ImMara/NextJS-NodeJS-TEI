import {deleteMenu, getMenu, getMenuWithParent, patchMenu} from "../../../../../server/queries/menu.queries";
import {deleteCategory, getCategory} from "../../../../../server/queries/category.queries";


export default async (req, res, next) => {
    switch (req.method) {
        case 'PATCH':
            try{

                // GET ID FROM URL
                const id = req.query.id;

                // GET BODY WITH DATA
                const body = req.body;

                // GET MENU WITH ID
                const menu = await getMenu(id);

                // UPDATE MENU
                await patchMenu(id,body);

                // MESSAGE
                const string = `Update success`;

                // RESPONSE FROM API
                res.json({
                    message: string,
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
                const string = `Delete success`

                // JSON RESPONSE
                res.json({success: string,})

            }catch (e) {

                // API RETURNS ERROR
                res.json({error: e})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;
    }
}