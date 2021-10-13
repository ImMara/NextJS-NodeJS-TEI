import {getFeatured} from "../../../../../server/queries/post.queries";

export default async (req,res,next,error) => {
    switch (req.method) {
        case 'GET':
            // get featured
            const featured = await getFeatured();

            res.json( featured );

            break;
    }
}
