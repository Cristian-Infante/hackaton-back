const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        console.log(`Cookies: ${req.cookies}`);

        const sessionCookie = req.cookies.session;
        if (!sessionCookie) {
            return res.status(401).json({ message: 'No estás autenticado.' });
        }

        const sessionData = JSON.parse(sessionCookie);
        const token = sessionData.token;

        console.log(token);

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

module.exports = authMiddleware;
