const requestRepository = require('../repositories/RequestRepository');

class RequestService {

    async createRequest(requestData) {
        
        const { requestType, product, description, userId } = requestData;

        if (!requestType || !product || !product.name || !product.quantity || !product.price || !userId) {
            throw new Error("Campos obligatorios faltantes");
        }

        
        return await requestRepository.create({
            requestType,
            product,
            description,
            user: userId
        });
    }

}

module.exports = new RequestService();