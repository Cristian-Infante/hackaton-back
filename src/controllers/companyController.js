const Company = require('../models/Company');

class CompanyController {
    // Listar todas las empresas
    async getCompanies(req, res) {
        try {
            const companies = await Company.find().populate('user', 'name email'); // Población para mostrar el usuario asociado
            res.status(200).json({
                message: "Lista de empresas obtenida exitosamente",
                data: companies
            });
        } catch (error) {
            console.error("Error al obtener empresas: ", error);
            res.status(500).json({ message: "Error del servidor al obtener empresas" });
        }
    }

    // Obtener una empresa por ID
    async getCompany(req, res) {
        try {
            const { id } = req.params;
            const company = await Company.findById(id).populate('user', 'name email');

            if (!company) {
                return res.status(404).json({ message: "Empresa no encontrada" });
            }

            res.status(200).json({
                message: "Empresa obtenida exitosamente",
                data: company
            });
        } catch (error) {
            console.error("Error al obtener la empresa: ", error);

            if (error.kind === "ObjectId") {
                return res.status(400).json({ message: "ID inválido" });
            }

            res.status(500).json({ message: "Error del servidor al obtener la empresa" });
        }
    }

    // Guardar una nueva empresa
    async saveCompany(req, res) {
        try {
            const { companyName, nit, productsRequired, contact, userId } = req.body;

            if (!companyName || !nit || !contact || !userId) {
                return res.status(400).json({ message: "Campos obligatorios faltantes" });
            }

            const newCompany = new Company({
                companyName,
                nit,
                productsRequired, // Lista de productos requeridos
                contact,
                user: userId // Relación con el usuario
            });

            await newCompany.save();
            res.status(201).json({ message: "Empresa registrada exitosamente", data: newCompany });
        } catch (error) {
            console.error("Error al guardar la empresa: ", error);

            if (error.code === 11000) {
                return res.status(400).json({ message: "El NIT ya está registrado" });
            }

            res.status(500).json({ message: "Error del servidor al guardar la empresa" });
        }
    }

    // Eliminar una empresa por ID
    async deleteCompany(req, res) {
        try {
            const { id } = req.params;
            const deletedCompany = await Company.findByIdAndDelete(id);

            if (!deletedCompany) {
                return res.status(404).json({ message: "Empresa no encontrada" });
            }

            res.status(200).json({
                message: "Empresa eliminada exitosamente",
                data: deletedCompany
            });
        } catch (error) {
            console.error("Error al eliminar la empresa: ", error);

            if (error.kind === "ObjectId") {
                return res.status(400).json({ message: "ID inválido" });
            }

            res.status(500).json({ message: "Error del servidor al eliminar la empresa" });
        }
    }
}

module.exports = new CompanyController();
