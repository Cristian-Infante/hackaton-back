const Request = require('../models/Request');

class RequestRepository {
    // Guardar un nuevo Request
    async create(requestData) {
        const request = new Request(requestData);
        return await request.save();
    }

    // Encontrar un Request por ID
    async findById(requestId) {
        return await Request.findById(requestId);
    }

    // Listar todos los Requests
    async findAll() {
        return await Request.find();
    }

    // Actualizar un Request por ID
    async updateById(requestId, updateData) {
        return await Request.findByIdAndUpdate(requestId, updateData, { new: true });
    }

    // Eliminar un Request por ID
    async deleteById(requestId) {
        return await Request.findByIdAndDelete(requestId);
    }
}

module.exports = new RequestRepository();
