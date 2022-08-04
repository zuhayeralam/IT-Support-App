import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import 'express-async-errors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import connectDB from './db/connect.js';
import authRouter from './routes/authRoutes.js';
import issuesRouter from './routes/issueRoutes.js';
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/authenticateUser.js';

const app = express();
dotenv.config();
if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
}
const __dirname = dirname(fileURLToPath(import.meta.url));
// only when ready to deploy
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/issues', authenticateUser, issuesRouter);
// only when ready to deploy
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});
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
