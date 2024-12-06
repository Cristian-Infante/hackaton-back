const chatService = require('../services/ChatService');

class ChatController {
    async chat(req, res) {
        try {
            const { message } = req.body;
            if (!message) {
                return res.status(400).json({ message: 'Debe proporcionar un mensaje.' });
            }

            const response = await chatService.generateResponse(message);
            res.status(200).json({ response });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ChatController();
