const express = require('express');
const router = express.Router();
const requestController = require('../controllers/RequestController');
const roleMiddleware = require("../middlewares/roleMiddleware");
const authMiddleware = require("../middlewares/authMiddleware"); // Controlador de autenticación

// Crear una nueva solicitud
router.post('/request', authMiddleware,  (req, res) => {
     // #swagger.tags = ['Request']
    requestController.createRequest(req, res);
});

// Listar todas las solicitudes
router.get('/requests',  authMiddleware, (req, res) => {
    // #swagger.tags = ['Request']
    requestController.getRequests(req, res);
});

// Obtener una solicitud por ID
router.get('/request/:id',  authMiddleware, (req, res) => {
    // #swagger.tags = ['Request']
    requestController.getRequest(req, res);
});

// Eliminar una solicitud por ID
router.delete('/request/:id', authMiddleware, (req, res) => {
    // #swagger.tags = ['Request']
    requestController.deleteRequest(req, res);
});

// Ruta para filtrar solicitudes por ubicación
router.get('/requests/filter/location', authMiddleware, (req, res) => {
    // #swagger.tags = ['Request']
    requestController.filterRequestsByLocation(req, res);
});

module.exports = router;
