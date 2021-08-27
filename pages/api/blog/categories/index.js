import {getCategories,createCategory} from '../../../../server/queries/category.queries';

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
                    title: body.title,
                    description: body.description,
                };

                // CREATE DATA IN DATABASE
                await createCategory(category);

                // SUCCESS MESSAGE
                const string = `new category success : ${body.title}`

                // RESPONSE FROM API
                res.json({
                    message: string,
                    data: category
                });

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;
    }
}