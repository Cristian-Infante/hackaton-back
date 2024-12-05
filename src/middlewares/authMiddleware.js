const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const session = req.cookies.session;
        if (!session || !session.token) {
            return res.status(401).json({ message: 'No estás autenticado.' });
        }

        // Verificar el token JWT
        const decoded = jwt.verify(session.token, process.env.JWT_KEY);
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

module.exports = authMiddleware;
