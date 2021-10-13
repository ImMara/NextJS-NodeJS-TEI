const {getRole} = require("../queries/role.queries");

exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403);
        res.redirect('/np-admin')
        // res.json({ message: 'Authentication failed'});
    }
}

exports.ensureRoleAllowsBlog = async (req,res,next)=>{
    const role = await getRole(req.user.role)
    console.log(role)
    !role.access.includes("blog") ? res.redirect("/404") : next()
    next();
}

exports.ensureRoleAllowsPage = async (req, res, next) =>{
    const role = await getRole(req.user.role)
    !role.access.includes("page") ? res.redirect("/404") : next()
    next();
}

exports.ensureRoleAllowsMenu = async (req, res, next) =>{
    const role = await getRole(req.user.role)
    !role.access.includes("menu") ? res.redirect("/404") : next()
    next();
}

exports.ensureRoleAllowsUsers = async (req, res, next) =>{
    const role = await getRole(req.user.role)
    !role.access.includes("users") ? res.redirect("/404") : next()
    next();
}

exports.ensureRoleAllowsSettings = async (req, res, next) =>{
    const role = await getRole(req.user.role)
    !role.access.includes("settings") ? res.redirect("/404") : next()
    next();
}