const mongoose = require('mongoose');
const offerSchema = require('./Offer'); // Importar el esquema de ofertas

const requestSchema = new mongoose.Schema({
    requestType: {
        type: String,
        enum: ['compra', 'venta'],
        required: true
    },
    product: {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    },
    description: { type: String, default: '' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['activa', 'cerrada'],
        default: 'activa'
    },
    offers: { type: [offerSchema.schema], default: [] } // Lista de ofertas asociadas a la solicitud
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
