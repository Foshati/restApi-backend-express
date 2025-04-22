import swaggerAutogen from 'swagger-autogen';
import path from 'path';

const doc = {
  info: {
    title: "Auth Service API",
    description: "Authentication Service API Documentation",
    version: "1.0.0"
  },
  host: "localhost:8080",
  schemes: ["http"],
  // basePath: "/api"  // Add this line to set the base path
};

const outputFile = path.join(__dirname, 'swagger-output.json');
const endpointsFiles = [path.join(__dirname, './routes/author.router.ts')];

swaggerAutogen()(outputFile, endpointsFiles, doc);