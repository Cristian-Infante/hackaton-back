const mongoose = require('mongoose');

// Esquema de puja
const bidSchema = new mongoose.Schema({
    offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true }, // Referencia a la oferta asociada
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuario que envía la puja
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuario que recibe la puja
    quantity: { type: Number, required: true }, // Cantidad propuesta en la puja
    price: { type: Number, required: true }, // Precio propuesto en la puja
    status: {
        type: String,
        enum: ['pendiente', 'aceptada', 'declinada'], // Estado de la puja
        default: 'pendiente'
    },
    message: { type: String, default: '' }, // Mensaje opcional para la puja
    createdAt: { type: Date, default: Date.now } // Fecha de creación
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
