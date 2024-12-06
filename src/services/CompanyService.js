const companyRepository = require('../repositories/CompanyRepository');

class CompanyService {
    // Obtener todas las empresas
    async getAllCompanies() {
        return await companyRepository.findAll();
    }

    // Obtener una empresa por ID
    async getCompanyById(id) {
        const company = await companyRepository.findById(id);

        if (!company) {
            throw new Error("Empresa no encontrada");
        }

        return company;
    }

    // Crear una nueva empresa
    async createCompany(companyData) {
        const { companyName, nit, contact, userId } = companyData;

        if (!companyName || !nit || !contact || !userId) {
            throw new Error("Campos obligatorios faltantes");
        }

        return await companyRepository.create({
            companyName,
            nit,
            contact,
            user: userId
        });
    }

    // Eliminar una empresa por ID
    async deleteCompanyById(id) {
        const deletedCompany = await companyRepository.deleteById(id);

        if (!deletedCompany) {
            throw new Error("Empresa no encontrada");
        }

        return deletedCompany;
    }
}

module.exports = new CompanyService();
