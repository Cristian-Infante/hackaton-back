const mongoose = require('mongoose');
const offerSchema = require('./Offer'); // Importar el esquema de ofertas

const requestSchema = new mongoose.Schema({
    requestType: {
        type: String,
        enum: ['compra', 'venta'], // Define si la solicitud es de compra o venta
        required: true
    },
    product: {
        name: { type: String, required: true }, // Nombre del producto
        quantity: { type: Number, required: true }, // Cantidad del producto
        price: { type: Number, required: true } // Precio por unidad
    },
    description: { type: String, default: '' }, // Descripción opcional de la solicitud
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuario asociado
    status: {
        type: String,
        enum: ['activa', 'cerrada'], // Estado de la solicitud
        default: 'activa'
    }
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
