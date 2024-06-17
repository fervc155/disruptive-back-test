import { validationResult, check } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    removeFileRequest(req);

    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const removeFileRequest=(req: Request)=>{

  if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error(`Error al eliminar el archivo: ${err.message}`);
        }
      });
    }
}