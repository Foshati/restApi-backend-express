import exfa from 'exfa';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import authorRouter from './routes/author.route';
import profileRouter from './routes/profile.route';
import bookRouter from './routes/book.route';


dotenv.config();
const app = exfa();
const PORT = process.env.PORT || 8080;

app.use(exfa.json());

//router
app.use("/authors", authorRouter);
app.use("/profiles", profileRouter);
app.use("/books", bookRouter);

//swagger
const swaggerDocument = require(path.join(__dirname, 'swagger-output.json'));
app.use('/docs', swaggerUi.serve as any, swaggerUi.setup(swaggerDocument) as any);
app.use('/docs.json', (_req, res) => {
  res.json(swaggerDocument);
});

//log
app.listen(PORT, () => {
  console.log(`Server is accessible at http://localhost:${PORT}`);
  console.log(`Swagger UI is running at http://localhost:${PORT}/docs`);
});