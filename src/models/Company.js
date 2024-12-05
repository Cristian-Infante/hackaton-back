const mongoose = require('mongoose');

// Sub-esquema para productos o insumos requeridos
const productRequiredSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nombre del producto
    requiredQuantity: { type: Number, required: true }, // Cantidad requerida
    estimatedDate: { type: Date, required: true } // Fecha estimada de necesidad
});

const companySchema = new mongoose.Schema({
    companyName: { type: String, required: true }, // Nombre de la empresa
    nit: { type: String, required: true, unique: true }, // Número de identificación tributaria
    productsRequired: { type: [productRequiredSchema], default: [] }, // Lista de productos requeridos
    contact: { type: String, required: true }, // Teléfono de contacto
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Referencia al usuario
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
