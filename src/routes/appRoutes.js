const express = require('express');
const authRoutes = require('./authRoutes'); // Rutas de autenticación
const peasantRoutes = require('./peasantRoutes');
const companyRoutes = require('./companyRoutes');
const supplierRoutes = require('./supplierRoutes');
const adminRoutes = require('./adminRoutes')
const chatRoutes = require('./chatRoutes')

const router = express.Router();

router.use(adminRoutes)
router.use('/auth', authRoutes);
router.use(peasantRoutes);
router.use(companyRoutes);
router.use(supplierRoutes);
router.use(chatRoutes)

module.exports = router;
