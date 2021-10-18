import {getSettings} from "../../../server/queries/settings.queries";

export default async (req, res, next) => {
    switch (req.method) {

        case 'GET':
            try {
                // GET SETTINGS
                const settings = await getSettings();

                res.json({
                    data:settings
                });

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message});

                // SERVER RETURNS ERROR
                console.error(e.message);

            }
            break;
    }
}