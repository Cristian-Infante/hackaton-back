const jwt = require('jsonwebtoken');

const roleMiddleware = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'No tienes permiso para acceder a este recurso.' });
    }
    next();
};

module.exports = roleMiddleware;
