const mongoose = require('mongoose');

// Esquema de oferta
const offerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuario que realiza la oferta
    quantity: { type: Number, required: true }, // Cantidad ofrecida
    price: { type: Number, required: true }, // Precio ofrecido por unidad
    createdAt: { type: Date, default: Date.now } // Fecha de creación
});

// Exportar el esquema para ser utilizado dentro del esquema de solicitudes
module.exports = offerSchema;
