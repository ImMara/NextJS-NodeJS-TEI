import {getSettings, patchSettings} from "../../../../server/queries/settings.queries";


export default async (req, res, next) =>{
    switch (req.method) {
        case 'PATCH':

            try {
                // GET ID FROM URL
                const id = req.query.id;

                // GET BODY WITH DATA
                const body = req.body;

                // GET SETTINGS WITH ID
                const settings = await getSettings();

                // UPDATE SETTINGS
                await patchSettings(id,body);

                // MESSAGE
                const string = `Update success`

                // RESPONSE FROM API
                res.json({
                    success: string,
                    data: settings
                })


            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message})

                // SERVER RETURNS ERROR
                console.error(e)

            }
    }
}