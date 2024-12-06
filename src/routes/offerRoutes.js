const express = require('express');
const router = express.Router();
const offerController = require('../controllers/OfferController');
const roleMiddleware = require("../middlewares/roleMiddleware");
const authMiddleware = require("../middlewares/authMiddleware"); 

// Crear una nueva oferta
router.post('/offer', authMiddleware, (req, res) => {
    // #swagger.tags = ['Offer']
    offerController.createOffer(req, res);
});

// Listar todas las ofertas de una solicitud
router.get('/offers/:requestId', authMiddleware, (req, res) => {
    // #swagger.tags = ['Offer']
    offerController.getOffersByRequest(req, res);
});

router.delete('/offer/:requestId/:offerId', authMiddleware,  roleMiddleware(['administrador']), (req, res) => {
    // #swagger.tags = ['Offer']
    offerController.deleteOffer(req, res);
});

module.exports = router;
