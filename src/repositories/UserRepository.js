const User = require('../models/User');

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async getAll() {
        return await User.find();
    }
}

module.exports = new UserRepository();
