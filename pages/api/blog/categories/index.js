import {getCategories,createCategory} from '../../../../server/queries/category.queries';
import {slugify} from "../../../../utils/functions";

export default async  (req,res,next) => {
    switch (req.method) {

        case 'GET':
            try {
                // GET ALL CATEGORIES
                const category = await getCategories();

                res.json({data:category})

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message});

                // SERVER RETURNS ERROR
                console.error(e.message);

            }
            break;

        case 'POST':
            try {
                // GETTING BODY WITH DATA
                const body = req.body;

                // CREATE OBJECT WITH BODY
                const category = {
                    title: slugify(body.title),
                    description: body.description,
                };

                // CREATE DATA IN DATABASE
                const cat = await createCategory(category);

                // SUCCESS MESSAGE
                const string = `Création d'une nouvelle catégorie : ${body.title}`

                // RESPONSE FROM API
                res.json({success: string,data:cat});

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;
    }
}