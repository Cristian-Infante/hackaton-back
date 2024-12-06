const Request = require('../models/Request');

class RequestRepository {

    async create(requestData) {
        return await Request.create(requestData);
    }

    async findByIdWithOffers(requestId) {
        return await Request.findById(requestId).populate('offers.user', 'name email');
    }


    async findAll() {
        return await Request.find().populate('user', 'name email');
    }

    async findById(id) {
        return await Request.findById(id)
            .populate('user', 'name email')
            .populate('offers.user', 'name email');
    }

    async deleteById(id) {
        return await Request.findByIdAndDelete(id);
    }

    async save(request) {
        return await request.save();
    }

    async updateOfferStatus(requestId, offerId, status) {
        const request = await Request.findById(requestId);

        if (!request) {
            throw new Error('Solicitud no encontrada');
        }

        const offer = request.offers.id(offerId);
        if (!offer) {
            throw new Error('Oferta no encontrada');
        }

        offer.status = status; // Actualizar el estado de la oferta
        return await request.save(); // Guardar los cambios
    }
}

module.exports = new RequestRepository();
