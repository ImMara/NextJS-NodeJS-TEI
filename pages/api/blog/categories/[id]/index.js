import {deleteCategory, getCategory , patchCategory} from "../../../../../server/queries/category.queries";


export default async (req,res,next) => {
    switch (req.method) {

        // TODO: better structure for api
        case 'GET':
            try{

                // GET ID FROM URL
                const id = req.query.id;

                // GET CATEGORY WITH ID
                const category = await getCategory(id);

                // RESPONSE FROM API
                res.json({
                    data:category
                })

            }catch (e) {

                // API RETURNS ERROR
                res.json({error: e})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;

        // TODO: change success message
        case 'PATCH':

            try {

                // GET ID FROM URL
                const id = req.query.id;

                // GET BODY WITH DATA
                const body = req.body;

                // GET CATEGORY WITH ID
                const category = await getCategory(id);

                // UPDATE CATEGORY;
                await patchCategory(id,body);

                // MESSAGE
                const string = `Update success`

                // RESPONSE FROM API
                res.json({success:string});

            }catch (e) {

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

                // GET CATEGORY WITH ID
                const category = await getCategory(id);

                // DELETE CATEGORY WITH ID
                await deleteCategory(id);

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