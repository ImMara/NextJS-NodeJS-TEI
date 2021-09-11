import {createMenu, getMenus} from "../../../../server/queries/menu.queries";


export default async (req, res, next) => {
    switch (req.method) {
        case 'GET':
            try{
                // GET MENU
                const menu = await getMenus();

                res.json({
                    data:menu
                })
            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message});

                // SERVER RETURNS ERROR
                console.error(e.message);

            }
            break;
        case 'POST':
            try{

                // getting body
                const body = req.body;

                const data = await createMenu(body);

            }catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message});

                // SERVER RETURNS ERROR
                console.error(e.message);

            }
    }
}