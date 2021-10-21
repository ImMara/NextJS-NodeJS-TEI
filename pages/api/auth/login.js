import {findUserPerEmail} from "../../../server/queries/user.queries";

export default async (req,res,next) =>{
    try{
        const { email, password } = await req.body;
        const user = await findUserPerEmail(email);
        if (user) {
            const match = await user.comparePassword(password);
            if (match) {
                await req.login(user);
                // res.redirect('/np-admin/dashboard');
                res.json({success:"ok"})
            } else {
                res.json({error : 'wrong password'});
            }
        } else {
            res.json({error : 'User not found'});
        }
    }catch (e) {
        res.json({error: e.message});
        console.log(e);
    }
}