const express = require('express');
const router = express.Router();
const chatController = require('../controllers/ChatController');

// Ruta principal para interactuar con el chat
router.post('/chat', (req, res) => {
    // #swagger.tags = ['Chat']
    chatController.chat(req, res);
});

module.exports = router;
