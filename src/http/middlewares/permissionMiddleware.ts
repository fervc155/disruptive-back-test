import { Request, Response, NextFunction } from 'express';
import {AuthenticatedRequest} from '../types';




export  const  permissionMiddleware =(permissions: string[])=>  {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user.role;
    if (!userRole) {
      return res.status(403).json({ message: 'Usuario no tiene roles asignados' });
    }

    if (permissions.length && !permissions.includes(userRole)) {
        return res.status(403).json({ message: 'Permiso denegado' });
    }
   
    next();
  };
};

