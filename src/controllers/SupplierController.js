const Supplier = require('../models/Supplier');

class SupplierController {
    // Listar todos los proveedores
    async getSuppliers(req, res) {
        try {
            const suppliers = await Supplier.find().populate('user', 'name email');
            res.status(200).json({
                message: "Lista de proveedores obtenida exitosamente",
                data: suppliers
            });
        } catch (error) {
            console.error("Error al obtener proveedores: ", error);
            res.status(500).json({ message: "Error del servidor al obtener proveedores" });
        }
    }

    // Obtener un proveedor por ID
    async getSupplier(req, res) {
        try {
            const { id } = req.params;
            const supplier = await Supplier.findById(id).populate('user', 'name email');

            if (!supplier) {
                return res.status(404).json({ message: "Proveedor no encontrado" });
            }

            res.status(200).json({
                message: "Proveedor obtenido exitosamente",
                data: supplier
            });
        } catch (error) {
            console.error("Error al obtener el proveedor: ", error);

            if (error.kind === "ObjectId") {
                return res.status(400).json({ message: "ID inválido" });
            }

            res.status(500).json({ message: "Error del servidor al obtener el proveedor" });
        }
    }

    // Crear un nuevo proveedor
    async saveSupplier(req, res) {
        try {
            const { supplierName, nit, contactPhone, address, productsOffered, coverageAreas, transportAvailability, userId } = req.body;

            if (!supplierName || !nit || !contactPhone || !address || !userId) {
                return res.status(400).json({ message: "Campos obligatorios faltantes" });
            }

            const newSupplier = new Supplier({
                supplierName,
                nit,
                contactPhone,
                address,
                productsOffered,
                coverageAreas,
                transportAvailability,
                user: userId
            });

            await newSupplier.save();
            res.status(201).json({ message: "Proveedor registrado exitosamente", data: newSupplier });
        } catch (error) {
            console.error("Error al guardar el proveedor: ", error);

            if (error.code === 11000) {
                return res.status(400).json({ message: "El NIT ya está registrado" });
            }

            res.status(500).json({ message: "Error del servidor al guardar el proveedor" });
        }
    }

    // Eliminar un proveedor
    async deleteSupplier(req, res) {
        try {
            const { id } = req.params;
            const deletedSupplier = await Supplier.findByIdAndDelete(id);

            if (!deletedSupplier) {
                return res.status(404).json({ message: "Proveedor no encontrado" });
            }

            res.status(200).json({
                message: "Proveedor eliminado exitosamente",
                data: deletedSupplier
            });
        } catch (error) {
            console.error("Error al eliminar el proveedor: ", error);

            if (error.kind === "ObjectId") {
                return res.status(400).json({ message: "ID inválido" });
            }

            res.status(500).json({ message: "Error del servidor al eliminar el proveedor" });
        }
    }
}

module.exports = new SupplierController();
