const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const appRoutes = require('./routes/appRoutes');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');

const server = () => {
    const app = express();
    const PORT = process.env.PORT || 3000;
    const URL = process.env.DEPLOY_URL || 'localhost';
    const allowedOrigins = [`http://${URL}:${PORT}`, `https://${URL}:${PORT}`];

    app.use(cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error('No permitido por CORS'));
        },
        credentials: true, // Permitir cookies en solicitudes CORS
    }));

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
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://${URL}:${PORT}`);
        console.log(`Documentación disponible en http://${URL}:${PORT}/api-docs`);
    });
};

module.exports = server;
