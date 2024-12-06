const Bid = require('../models/Bid');
const Offer = require('../models/Offer');

class BidController {
    
    // Crear una nueva puja
    async createBid(req, res) {
        try {
            const { offerId, senderId, receiverId, quantity, price, message } = req.body;

            if (!offerId || !senderId || !receiverId || !quantity || !price) {
                return res.status(400).json({ message: "Campos obligatorios faltantes" });
            }

            try {
                const offer = await Request.findById(offerId);
                console.log(offer)
                console.log(offer)
            } catch (error) {
                return res.status(404).json({ message: "Oferta no encontrada" });
            }

            console.log("llego")

            try {
                await Request.findById(senderId);
            } catch (error) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            const newBid = new Bid({
                offer: offerId,
                sender: senderId,
                receiver: receiverId,
                quantity,
                price,
                message
            });

            await newBid.save();
            res.status(201).json({ message: "Puja creada exitosamente", data: newBid });
        } catch (error) {
            console.error("Error al crear la puja: ", error);
            res.status(500).json({ message: "Error del servidor al crear la puja" });
        }
    }

    // Aceptar una puja
    async acceptBid(req, res) {
        try {
            const { bidId } = req.params;

            const bid = await Bid.findById(bidId);

            if (!bid) {
                return res.status(404).json({ message: "Puja no encontrada" });
            }

            bid.status = 'aceptada';
            await bid.save();

            res.status(200).json({ message: "Puja aceptada exitosamente", data: bid });
        } catch (error) {
            console.error("Error al aceptar la puja: ", error);
            res.status(500).json({ message: "Error del servidor al aceptar la puja" });
        }
    }

    // Rechazar una puja
    async declineBid(req, res) {
        try {
            const { bidId } = req.params;

            const bid = await Bid.findById(bidId);

            if (!bid) {
                return res.status(404).json({ message: "Puja no encontrada" });
            }

            bid.status = 'declinada';
            await bid.save();

            res.status(200).json({ message: "Puja declinada exitosamente", data: bid });
        } catch (error) {
            console.error("Error al declinar la puja: ", error);
            res.status(500).json({ message: "Error del servidor al declinar la puja" });
        }
    }

    // Obtener todas las pujas para una oferta
    async getBidsByOffer(req, res) {
        try {
            const { offerId } = req.params;

            const bids = await Bid.find({ offer: offerId }).populate('sender', 'name email').populate('receiver', 'name email');

            res.status(200).json({
                message: "Lista de pujas obtenida exitosamente",
                data: bids
            });
        } catch (error) {
            console.error("Error al obtener las pujas: ", error);
            res.status(500).json({ message: "Error del servidor al obtener las pujas" });
        }
    }
}

module.exports = new BidController();
