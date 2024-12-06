const peasantRepository = require('../repositories/PeasantRepository');

class PeasantService {
    // Obtener todos los campesinos
    async getAllPeasants() {
        return await peasantRepository.findAll();
    }

    // Obtener un campesino por su ID
    async getPeasantById(id) {
        const peasant = await peasantRepository.findById(id);

        if (!peasant) {
            throw new Error("Campesino no encontrado");
        }

        return peasant;
    }

    // Crear un nuevo campesino
    async createPeasant(peasantData) {
        
        const { farmName, products, ubication, userId } = peasantData;

        if (!farmName || !ubication || !ubication.latitude || !ubication.longitude || !userId) {
            throw new Error("Campos obligatorios faltantes");
        }

        return await peasantRepository.create({
            farmName,
            products,
            ubication,
            user: userId
        });
    }

    // Eliminar un campesino por su ID
    async deletePeasantById(id) {
        const deletedPeasant = await peasantRepository.deleteById(id);

        if (!deletedPeasant) {
            throw new Error("Campesino no encontrado");
        }

        return deletedPeasant;
    }

    async addProductToPeasant(peasantId, product) {
        const peasant = await peasantRepository.findById(peasantId);

        if (!peasant) {
            throw new Error("Campesino no encontrado");
        }

        if (!product.name || !product.productionQuantity) {
            throw new Error("Información del producto incompleta");
        }

        return await peasantRepository.addProduct(peasantId, product);
    }

    // Eliminar un producto de un campesino
    async removeProductFromPeasant(peasantId, productId) {
        const peasant = await peasantRepository.findById(peasantId);

        if (!peasant) {
            throw new Error("Campesino no encontrado");
        }

        const productExists = peasant.products.some(product => product._id.toString() === productId);

        if (!productExists) {
            throw new Error("Producto no encontrado en la lista del campesino");
        }

        return await peasantRepository.removeProduct(peasantId, productId);
    }
}

module.exports = new PeasantService();
