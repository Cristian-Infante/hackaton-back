const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/SupplierController');
const roleMiddleware = require("../middlewares/roleMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

// Listar todos los proveedores
router.get('/suppliers', authMiddleware, (req, res) => {
    supplierController.getSuppliers(req, res);
});

// Obtener un proveedor por ID
router.get('/supplier/:id', authMiddleware, (req, res) => {
    supplierController.getSupplier(req, res);
});

// Crear un nuevo proveedor
router.post('/supplier', authMiddleware, roleMiddleware(['administrador', 'proveedor']), (req, res) => {
    supplierController.saveSupplier(req, res);
});

// Eliminar un proveedor por ID
router.delete('/supplier/:id', authMiddleware, roleMiddleware(['administrador']), (req, res) => {
    supplierController.deleteSupplier(req, res);
});

module.exports = router;
