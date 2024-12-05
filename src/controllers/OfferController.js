const Request = require('../models/Request');

class OfferController {
    // Crear una nueva oferta para una solicitud
    async createOffer(req, res) {
        try {
            const { requestId, userId, quantity, price } = req.body;

            if (!requestId || !userId || !quantity || !price) {
                return res.status(400).json({ message: "Campos obligatorios faltantes" });
            }

            // Buscar la solicitud asociada
            const request = await Request.findById(requestId);

            if (!request) {
                return res.status(404).json({ message: "Solicitud no encontrada" });
            }

            if (request.status === 'cerrada') {
                return res.status(400).json({ message: "No se pueden agregar ofertas a solicitudes cerradas" });
            }

            // Crear la oferta
            const newOffer = { user: userId, quantity, price };
            request.offers.push(newOffer);

            // Guardar la solicitud con la nueva oferta
            await request.save();

            res.status(201).json({ message: "Oferta creada exitosamente", data: newOffer });
        } catch (error) {
            console.error("Error al crear la oferta: ", error);
            res.status(500).json({ message: "Error del servidor al crear la oferta" });
        }
    }

    // Listar todas las ofertas de una solicitud
    async getOffersByRequest(req, res) {
        try {
            const { requestId } = req.params;

            const request = await Request.findById(requestId).populate('offers.user', 'name email');

            if (!request) {
                return res.status(404).json({ message: "Solicitud no encontrada" });
            }

            res.status(200).json({
                message: "Lista de ofertas obtenida exitosamente",
                data: request.offers
            });
        } catch (error) {
            console.error("Error al obtener las ofertas: ", error);
            res.status(500).json({ message: "Error del servidor al obtener las ofertas" });
        }
    }
}

module.exports = new OfferController();
