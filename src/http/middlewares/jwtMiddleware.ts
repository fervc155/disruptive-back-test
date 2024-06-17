import { Request as ExpressRequest, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import {AuthenticatedRequest} from '../types';

export const jwtMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
   let token = typeof req.headers['authorization'] === 'string' ? req.headers['authorization'] : '';
   token =token.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token de autenticación inválido' });
  }
};
