const express = require('express');
const authRoutes = require('./authRoutes'); // Rutas de autenticación

const router = express.Router();

// Asigna el prefijo '/auth' a las rutas de autenticación
router.use('/auth', authRoutes);

module.exports = router;
