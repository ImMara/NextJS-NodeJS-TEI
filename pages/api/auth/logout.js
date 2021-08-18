export default async (req, res, next) =>{
    req.logout();
    res.redirect('/');
}