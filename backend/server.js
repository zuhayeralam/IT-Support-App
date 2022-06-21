import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import 'express-async-errors';
import connectDB from './db/connect.js';
import authRouter from './routes/authRoutes.js';
import issuesRouter from './routes/issueRoutes.js';
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

const app = express();
dotenv.config();
app.use(logger('dev'));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome!');
});
app.get('/api/v1/', (req, res) => {
  res.send('Welcome!');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/issues', issuesRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
