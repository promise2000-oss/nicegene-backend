import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nicegene Website API",
      version: "1.0.0",
      description:
        "API documentation for Nicegene Website portfolio, blog, staff directory, academy, and contact form.",
    },
    servers: [
      { url: `${process.env.BASE_URL || "http://localhost:5000"}/api`, description: "API Server" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
}; // Scan both TS source files and compiled JS output files

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('[Swagger] Docs available at http://localhost:5000/api-docs');
};
