const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nombre del producto
    productionQuantity: { type: Number, required: true } // Cantidad en libras
});

const peasantSchema = new mongoose.Schema({
    farmName: { type: String, required: true },
    products: { type: [productSchema], default: [] }, // Lista de productos
    ubication: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo User
        required: true
    }
});

const Peasant = mongoose.model('Peasant', peasantSchema);

module.exports = Peasant;
