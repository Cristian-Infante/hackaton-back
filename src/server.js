const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json'); // Archivo generado por swagger-autogen
const appRoutes = require('./routes/appRoutes'); // Rutas de la API
const connectDB = require('./config/database'); // Conexión a la base de datos
const cookieParser = require('cookie-parser'); // Manejo de cookies

const server = () => {
    const app = express();

    // Middleware para parsear JSON y cookies
    app.use(express.json());
    app.use(cookieParser());

    // Rutas de la API
    app.use('/', appRoutes);

    // Documentación Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Conectar a MongoDB
    connectDB();

    // Encabezados de seguridad
    app.use((req, res, next) => {
        res.setHeader('Content-Security-Policy', "script-src 'self'");
        next();
    });

    // Arrancar el servidor
    const PORT = process.env.PORT || 3000;
    const url = process.env.DEPLOY_URL || 'localhost';
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://${url}:${PORT}`);
        console.log(`Documentación disponible en http://${url}:${PORT}/api-docs`);
    });
};

module.exports = server;
