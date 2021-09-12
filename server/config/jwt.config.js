const secret = 'a2463421-b798-470a-b4ee-fd23783ec69d';
const jwt = require('jsonwebtoken');
const { findUserPerId } = require('../queries/user.queries');
const { server } = require('../server');

const createJwtToken = (user) => {
    return jwt.sign({
        sub: user._id.toString(),
        username:user.username,
        exp: Math.floor(Date.now() / 1000) + 50000
    }, secret);
}
exports.createJwtToken = createJwtToken;

const extractUserFromToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decodedToken = jwt.verify(token, secret);
            const user = await findUserPerId(decodedToken.sub);
            if (user) {
                req.user = user;
                next();
            } else {
                res.clearCookie('jwt');
                res.redirect('/');
            }
        } catch(e) {
            res.clearCookie('jwt');
            res.redirect('/');
        }
    } else {
        next();
    }
}

const addJwtFeatures = (req, res, next) => {
    req.isAuthenticated = () => !!req.user;
    req.logout = () => res.clearCookie('jwt');
    req.login = (user) => {
        const token = createJwtToken(user);
        res.cookie('jwt', token);
    }
    next();
}

server.use(extractUserFromToken);
server.use(addJwtFeatures);