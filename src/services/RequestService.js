const requestRepository = require('../repositories/RequestRepository');
const UserRepository = require('../repositories/UserRepository');

class RequestService {
    async createRequest(requestData) {

        const userId = requestData.user;
        const userFound = await UserRepository.findById(userId)
  
        if(!userFound){
            throw new Error('Usuario no encontrado');
        }

        return await requestRepository.create(requestData);
    }

    async getAllRequests() {
        return await requestRepository.findAll();
    }

    async getRequestById(id) {
        // Validar ID si es necesario
        if (!id) {
            throw new Error('ID inválido');
        }

        const request = await requestRepository.findById(id);
        if (!request) {
            throw new Error('Solicitud no encontrada');
        }

        return request;
    }

    async deleteRequestById(id) {
        
        if (!id) {
            throw new Error('ID inválido');
        }

        const deletedRequest = await requestRepository.deleteById(id);
        if (!deletedRequest) {
            throw new Error('Solicitud no encontrada');
        }

        return deletedRequest;
    }
}

module.exports = new RequestService();
