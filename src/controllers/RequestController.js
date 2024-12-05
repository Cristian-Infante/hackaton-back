const Request = require('../models/Request');

class RequestController {
    // Crear una nueva solicitud
    async createRequest(req, res) {
        try {
            const { requestType, product, description, userId } = req.body;

            if (!requestType || !product || !product.name || !product.quantity || !product.price || !userId) {
                return res.status(400).json({ message: "Campos obligatorios faltantes" });
            }

            const newRequest = new Request({
                requestType,
                product,
                description,
                user: userId
            });

            await newRequest.save();
            res.status(201).json({ message: "Solicitud creada exitosamente", data: newRequest });
        } catch (error) {
            console.error("Error al crear la solicitud: ", error);
            res.status(500).json({ message: "Error del servidor al crear la solicitud" });
        }
    }

    // Listar todas las solicitudes
    async getRequests(req, res) {
        try {
            const requests = await Request.find().populate('user', 'name email');
            res.status(200).json({
                message: "Lista de solicitudes obtenida exitosamente",
                data: requests
            });
        } catch (error) {
            console.error("Error al obtener solicitudes: ", error);
            res.status(500).json({ message: "Error del servidor al obtener solicitudes" });
        }
    }

    // Obtener una solicitud por ID
    async getRequest(req, res) {
        try {
            const { id } = req.params;

            const request = await Request.findById(id)
                .populate('user', 'name email')
                .populate('offers.user', 'name email'); // Poblamos también las ofertas

            if (!request) {
                return res.status(404).json({ message: "Solicitud no encontrada" });
            }

            res.status(200).json({
                message: "Solicitud obtenida exitosamente",
                data: request
            });
        } catch (error) {
            console.error("Error al obtener la solicitud: ", error);

            if (error.kind === "ObjectId") {
                return res.status(400).json({ message: "ID inválido" });
            }

            res.status(500).json({ message: "Error del servidor al obtener la solicitud" });
        }
    }

    // Eliminar una solicitud
    async deleteRequest(req, res) {
        try {
            const { id } = req.params;
            const deletedRequest = await Request.findByIdAndDelete(id);

            if (!deletedRequest) {
                return res.status(404).json({ message: "Solicitud no encontrada" });
            }

            res.status(200).json({
                message: "Solicitud eliminada exitosamente",
                data: deletedRequest
            });
        } catch (error) {
            console.error("Error al eliminar la solicitud: ", error);

            if (error.kind === "ObjectId") {
                return res.status(400).json({ message: "ID inválido" });
            }

            res.status(500).json({ message: "Error del servidor al eliminar la solicitud" });
        }
    }
}

module.exports = new RequestController();
