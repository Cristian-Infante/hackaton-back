const Peasant = require('../models/Peasant');

class UserController {
    
    // Obtener todos los campesinos
    async getPeasants(req, res) {
        try {
            const peasants = await Peasant.find(); // Obtiene todos los registros
            res.status(200).json({
                message: "Lista de todos los campesinos obtenida exitosamente",
                data: peasants
            });
        } catch (error) {
            console.error("Error al obtener campesinos: ", error);
            res.status(500).json({ message: "Error del servidor al obtener campesinos" });
        }
    }

    // Obtener un campesino por su ID
    async getPeasant(req, res) {
        try {
            const { id } = req.params;
            const peasant = await Peasant.findById(id).populate('user', 'name email role'); // Incluye datos del usuario
    
            if (!peasant) {
                return res.status(404).json({ message: "Campesino no encontrado" });
            }
    
            res.status(200).json({
                message: "Campesino obtenido exitosamente",
                data: peasant
            });
        } catch (error) {
            console.error("Error al obtener el campesino: ", error);
    
            if (error.kind === "ObjectId") {
                return res.status(400).json({ message: "ID inválido" });
            }
    
            res.status(500).json({ message: "Error del servidor al obtener el campesino" });
        }
    }

    // Guardar un nuevo campesino
    async savePeasant(req, res) {
        try {
            const { farmName, products, ubication, userId } = req.body;

            if (!farmName || !ubication || !ubication.latitude || !ubication.longitude || !userId) {
                return res.status(400).json({ message: "Campos obligatorios faltantes" });
            }

            const newPeasant = new Peasant({
                farmName,
                products,
                ubication,
                user: userId // Relación con el usuario
            });

            await newPeasant.save();
            res.status(201).json({ message: "Campesino registrado exitosamente", data: newPeasant });
        } catch (error) {
            console.error("Error al guardar el campesino: ", error);
            res.status(500).json({ message: "Error del servidor" });
        }
    }

    // Eliminar un campesino por su ID
    async deletePeasant(req, res) {
        try {
            const { id } = req.params; // Extrae el ID de los parámetros de la ruta
            const deletedPeasant = await Peasant.findByIdAndDelete(id); // Elimina el campesino por su ID

            if (!deletedPeasant) {
                return res.status(404).json({ message: "Campesino no encontrado" });
            }

            res.status(200).json({
                message: "Campesino eliminado exitosamente",
                data: deletedPeasant
            });
        } catch (error) {
            console.error("Error al eliminar el campesino: ", error);

            // Manejo de errores para IDs malformados
            if (error.kind === "ObjectId") {
                return res.status(400).json({ message: "ID inválido" });
            }

            res.status(500).json({ message: "Error del servidor al eliminar el campesino" });
        }
    }

}

module.exports = new UserController();
