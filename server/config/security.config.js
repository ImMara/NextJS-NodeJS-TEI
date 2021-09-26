exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log(req.user)
        next();
    } else {
        res.status(403);
        res.json({ message: 'Authentication failed'});
    }
}