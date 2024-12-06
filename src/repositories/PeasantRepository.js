const Peasant = require('../models/Peasant');

class PeasantRepository {
    // Obtener todos los campesinos
    async findAll() {
        return await Peasant.find();
    }

    // Obtener un campesino por su ID
    async findById(id) {
        return await Peasant.findById(id).populate('user', 'name email role');
    }

    // Crear un nuevo campesino
    async create(peasantData) {
        const peasant = new Peasant(peasantData);
        return await peasant.save();
    }

    // Eliminar un campesino por su ID
    async deleteById(id) {
        return await Peasant.findByIdAndDelete(id);
    }

    async addProduct(peasantId, product) {
        return await Peasant.findByIdAndUpdate(
            peasantId,
            { $push: { products: product } }, // Agregar el producto a la lista
            { new: true } // Retornar el documento actualizado
        );
    }

    // Eliminar un producto de la lista de productos de un campesino
    async removeProduct(peasantId, productId) {
        return await Peasant.findByIdAndUpdate(
            peasantId,
            { $pull: { products: { _id: productId } } }, // Eliminar el producto por su ID
            { new: true } // Retornar el documento actualizado
        );
    }
}

module.exports = new PeasantRepository();
