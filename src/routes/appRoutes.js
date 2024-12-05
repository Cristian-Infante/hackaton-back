const express = require('express');
const authRoutes = require('./authRoutes'); // Rutas de autenticación
const peasantRoutes = require('./peasantRoutes');
const companyRoutes = require('./companyRoutes');
const supplierRoutes = require('./supplierRoutes');

const router = express.Router();

// Asigna el prefijo '/auth' a las rutas de autenticación
router.use('/auth', authRoutes);
router.use(peasantRoutes);
router.use(companyRoutes);
router.use(supplierRoutes);

module.exports = router;
