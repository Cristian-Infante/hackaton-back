const express = require('express');
const router = express.Router();
const bidController = require('../controllers/BidController');

// Crear una nueva puja
router.post('/bid', (req, res) => {
    // #swagger.tags = ['Bids']
    bidController.createBid(req, res);
});

// Aceptar una puja
router.patch('/bid/accept/:bidId', (req, res) => {
     // #swagger.tags = ['Bids']
    bidController.acceptBid(req, res);
});

// Rechazar una puja
router.patch('/bid/decline/:bidId', (req, res) => {
     // #swagger.tags = ['Bids']
    bidController.declineBid(req, res);
});

// Listar todas las pujas de una oferta
router.get('/bids/:offerId', (req, res) => {
     // #swagger.tags = ['Bids']
    bidController.getBidsByOffer(req, res);
});


module.exports = router;