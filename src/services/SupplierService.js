const supplierRepository = require('../repositories/SupplierRepository');
const UserRepository = require('../repositories/UserRepository');

class SupplierService {
    // Listar todos los proveedores
    async getAllSuppliers() {
        return await supplierRepository.findAll();
    }

    // Obtener un proveedor por ID
    async getSupplierById(id) {
        const supplier = await supplierRepository.findById(id);
        if (!supplier) {
            throw new Error("Proveedor no encontrado");
        }
        return supplier;
    }

    // Crear un nuevo proveedor
    async createSupplier(supplierData) {
        
        const { supplierName, nit, contactPhone, address, userId } = supplierData;

        if (!supplierName || !nit || !contactPhone || !address || !userId) {
            throw new Error("Campos obligatorios faltantes");
        }

        const userFound = await UserRepository.findById(userId);

        if(userFound){
            throw new Error("Usuario ya registrado");
        }

        return await supplierRepository.create({
            supplierName,
            nit,
            contactPhone,
            address,
            productsOffered: supplierData.productsOffered || [],
            coverageAreas: supplierData.coverageAreas || [],
            transportAvailability: supplierData.transportAvailability || false,
            user: userId 
        });
    }

    // Eliminar un proveedor por ID
    async deleteSupplierById(id) {
        const deletedSupplier = await supplierRepository.deleteById(id);
        if (!deletedSupplier) {
            throw new Error("Proveedor no encontrado");
        }
        return deletedSupplier;
    }

    // Agregar un producto ofrecido a un proveedor
    async addProductToSupplier(supplierId, product) {
        const supplier = await supplierRepository.findById(supplierId);
        if (!supplier) {
            throw new Error("Proveedor no encontrado");
        }
        if (!product.name || !product.price) {
            throw new Error("Información del producto incompleta");
        }
        return await supplierRepository.addProduct(supplierId, product);
    }

    // Eliminar un producto ofrecido de un proveedor
    async removeProductFromSupplier(supplierId, productId) {
        const supplier = await supplierRepository.findById(supplierId);
        if (!supplier) {
            throw new Error("Proveedor no encontrado");
        }
        const productExists = supplier.productsOffered.some(
            product => product._id.toString() === productId
        );
        if (!productExists) {
            throw new Error("Producto no encontrado en la lista del proveedor");
        }
        return await supplierRepository.removeProduct(supplierId, productId);
    }
}

module.exports = new SupplierService();
