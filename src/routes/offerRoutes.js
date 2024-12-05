const express = require('express');
const router = express.Router();
const offerController = require('../controllers/OfferController');

// Crear una nueva oferta
router.post('/offer', (req, res) => {
    // #swagger.tags = ['Offer']
    offerController.createOffer(req, res);
});

// Listar todas las ofertas de una solicitud
router.get('/offers/:requestId', (req, res) => {
    // #swagger.tags = ['Offer']
    offerController.getOffersByRequest(req, res);
});

module.exports = router;
