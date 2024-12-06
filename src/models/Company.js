const mongoose = require('mongoose');



const companySchema = new mongoose.Schema({
    companyName: { type: String, required: true }, // Nombre de la empresa
    nit: { type: String, required: true, unique: true }, // Número de identificación tributaria
    contact: { type: String, required: true }, // Teléfono de contacto
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Referencia al usuario
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
