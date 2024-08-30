import swaggerJsdoc from "swagger-jsdoc"

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API with Swagger',
        version: '1.0.0',
        description: 'A simple Express API application with Swagger documentation',
    },
    servers: [
        {
            url: 'http://localhost:3000',
        },
    ],
};

// Options for the swagger docs
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'], // This path can be adjusted to point to your route files
};

// Initialize swagger-jsdoc
export const swaggerSpec = swaggerJsdoc(options);
