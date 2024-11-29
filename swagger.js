const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Hackathon API',
        description: 'API autodocumentada con swagger-autogen',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    securityDefinitions: {
        BearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Añade "Bearer " seguido del token JWT.',
        },
    },
    security: [
        {
            BearerAuth: [],
        },
    ],
};

const outputFile = './swagger-output.json'; // Archivo de salida
const endpointsFiles = ['./src/routes/appRoutes.js']; // Archivo con todas las rutas centralizadas

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Documentación Swagger generada exitosamente.');
});
