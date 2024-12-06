const Company = require('../models/Company');

class CompanyRepository {
    // Obtener todas las empresas
    async findAll() {
        return await Company.find().populate('user', 'name email');
    }

    // Obtener una empresa por ID
    async findById(id) {
        return await Company.findById(id).populate('user', 'name email');
    }

    // Crear una nueva empresa
    async create(companyData) {
        const company = new Company(companyData);
        return await company.save();
    }

    // Eliminar una empresa por ID
    async deleteById(id) {
        return await Company.findByIdAndDelete(id);
    }
}

module.exports = new CompanyRepository();
