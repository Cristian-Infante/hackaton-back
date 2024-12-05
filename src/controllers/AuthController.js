const authService = require('../services/AuthService');

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password, confirmPassword, role } = req.body;

            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Las contraseñas no coinciden.' });
            }

            const user = await authService.register({ name, email, password, role });
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Autenticar usuario y generar token
            const { token, userInfo } = await authService.login(email, password);

            // Configurar cookie segura con el token y datos del usuario
            res.cookie('session', { token, name: userInfo.name, email: userInfo.email, role: userInfo.role }, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000,
            });

            // Enviar el token en el cuerpo solo para pruebas (no en producción)
            if (process.env.NODE_ENV !== 'production') {
                return res.status(200).json({ token, message: 'Inicio de sesión exitoso.' });
            }
            return res.status(200).json({ message: 'Inicio de sesión exitoso.' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async logout(req, res) {
        try {
            // Eliminar cookie de sesión
            res.clearCookie('session');
            res.status(200).json({ message: 'Logout exitoso.' });
        } catch (error) {
            res.status(500).json({ message: 'Error al cerrar sesión.' });
        }
    }
}

module.exports = new AuthController();
