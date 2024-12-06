const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {

        console.log("auth")
        console.log("auth")
        console.log("auth")

        const sessionCookie = req.cookies.session;
        
        console.log(sessionCookie)
        console.log(sessionCookie)

        const sessionData = JSON.parse(sessionCookie);
        const token = sessionData.token;

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

module.exports = authMiddleware;
