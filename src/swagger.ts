import swaggerAutogen from 'swagger-autogen';

interface SwaggerOptions {
  openapi: string;
  language: string;
  disableLogs: boolean;
  autoHeaders: boolean;
  autoQuery: boolean;
  autoBody: boolean;
}

interface SwaggerInfo {
  version: string;
  title: string;
  description: string;
  contact: {
    name: string;
    email: string;
  };
}

interface SwaggerDocument {
  openapi: string;
  info: SwaggerInfo;
  host: string;
  basePath: string;
  schemes: string[];
  consumes: string[];
  produces: string[];
  tags: Array<{
    name: string;
    description: string;
  }>;
  securityDefinitions: Record<string, any>;
  definitions: {
    todoResponse: {
      code: number;
      message: string;
    };
    [key: string]: {
      code: number | string;
      message: string;
    };
  };
}

const swaggerOptions: SwaggerOptions = {
  openapi: "3.0.0",
  language: "en-US",
  disableLogs: false,
  autoHeaders: false,
  autoQuery: false,
  autoBody: false,
};

const swaggerDoc: SwaggerDocument = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Todo Apis",
    description: "API for Managing todo calls",
    contact: {
      name: "API Support",
      email: "tiwariankit496@gmail.com",
    },
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "TODO CRUD",
      description: "TODO related apis",
    },
    {
      name: "Todo",
      description: "Todo App",
    },
  ],
  securityDefinitions: {},
  definitions: {
    todoResponse: {
      code: 200,
      message: "Success",
    },
    "errorResponse.400": {
      code: 400,
      message: "The request was malformed or invalid. Please check the request parameters.",
    },
    "errorResponse.401": {
      code: 401,
      message: "Authentication failed or user lacks proper authorization.",
    },
    "errorResponse.403": {
      code: 403,
      message: "You do not have permission to access this resource.",
    },
    "errorResponse.404": {
      code: "404",
      message: "The requested resource could not be found on the server.",
    },
    "errorResponse.500": {
      code: 500,
      message: "An unexpected error occurred on the server. Please try again later.",
    },
  },
};

const outputFile = "./src/swagger-output.json";
const endpointsFiles = ["./src/routes/book.Routes.ts"];

// Only generate Swagger documentation if this file is run directly
if (require.main === module) {
  const generateSwagger = swaggerAutogen(swaggerOptions);
  generateSwagger(outputFile, endpointsFiles, swaggerDoc);
}

export { swaggerDoc, swaggerOptions };