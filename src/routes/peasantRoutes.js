const express = require('express');
const router = express.Router();
const roleMiddleware = require("../middlewares/roleMiddleware");
const authMiddleware = require("../middlewares/authMiddleware"); // Controlador de autenticación
const peasantController = require('../controllers/PeasantController');

// obtener todos los campesinos
router.get('/peasants', authMiddleware,  (req, res) => {
    // #swagger.tags = ['Authentication']
    peasantController.getPeasants(req, res);
});

// obtener campesino por id
router.get('/peasant/:id',authMiddleware,  (req, res) => {
    // #swagger.tags = ['Authentication']
    peasantController.getPeasant(req, res);
});

// Ruta de registro campesino
router.post('/save/peasant', authMiddleware, roleMiddleware(['administrador', 'agricultor']), (req, res) => {
    // #swagger.tags = ['Authentication']
    peasantController.savePeasant(req, res);
});

router.delete('/peasant/:id', authMiddleware, roleMiddleware(['administrador']), (req, res) => {
    // #swagger.tags = ['Peasants']
    peasantController.deletePeasant(req, res);
});

module.exports = router;
