const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'Flowchart API', version: '1.0.0' },
    },
    apis: ['./src/routes/*.js'], // Reference routes for auto-doc generation
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs)); // Serve Swagger UI
};
