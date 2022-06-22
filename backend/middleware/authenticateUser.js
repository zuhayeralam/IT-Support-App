import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errorSubs/index.js';

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };

    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
};

export default authenticateUser;
