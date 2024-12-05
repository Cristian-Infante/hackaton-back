const express = require('express');
const authRoutes = require('./authRoutes'); // Rutas de autenticación
const peasantRoutes = require('./peasantRoutes');
const companyRoutes = require('./companyRoutes');

const router = express.Router();

// Asigna el prefijo '/auth' a las rutas de autenticación
router.use('/auth', authRoutes);
router.use(peasantRoutes);
router.use(companyRoutes);

module.exports = router;
