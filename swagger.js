const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: 'Netflix-Project-API',
        description: 'This API provides user authentication, profile management, address management, discount retrieval, and application settings for a Netflix-like service.',
    },
    servers: [
        {
            url: "http://localhost:8001",
        },
    ],
    securityDefinitions: {
        BearerAuth: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Provide the token in the format: `Bearer <token>`",
        },
    },
    security: [
        {
            BearerAuth: [],
        },
    ],
};

const outputFile = './swagger-output.json';

const routes = ['./routes/*.js'];

swaggerAutogen(outputFile, routes, doc);
