import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import authorRouter from './routes/author.router';
import bookRouter from 'routes/book.router';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

//router
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

//swagger
const swaggerDocument = require(path.join(__dirname, 'swagger-output.json'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/docs.json', (_req, res) => {
  res.json(swaggerDocument);
});

//log
app.listen(PORT, () => {
  console.log(`Server is accessible at http://localhost:${PORT}`);
  console.log(`Swagger UI is running at http://localhost:${PORT}/docs`);
});