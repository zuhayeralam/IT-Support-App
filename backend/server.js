import express from 'express';
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
