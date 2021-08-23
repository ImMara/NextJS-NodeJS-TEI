exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403);
        res.json({ message: 'Authentication failed'});
    }
}