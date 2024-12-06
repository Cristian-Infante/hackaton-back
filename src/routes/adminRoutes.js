const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

// Obtener todos los usuarios
router.get('/getUsers', (req, res) => {
    // #swagger.tags = ['Administration']
    return adminController.getAllUsers(req, res);
})

module.exports = router;