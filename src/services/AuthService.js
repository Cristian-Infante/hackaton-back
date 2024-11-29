const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const userRepository = require('../repositories/UserRepository');

class AuthService {
    async register(userData) {
        const { name, email, password } = userData;

        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userRepository.create({
            ...userData,
            password: hashedPassword,
        });

        return { id: user.id, name: user.name, email: user.email };
    }

    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Credenciales inválidas');
        }

        const token = jwt.generateToken({ id: user.id });
        return {
            token,
            userInfo: { name: user.name, email: user.email },
        };
    }
}

module.exports = new AuthService();
