import {validator} from './validator';
import { validationResult, check, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import {upload} from '../../app/config/multer';

   

export const create = () => {
  return [
    upload.single('file'),
    (req:Request, res:Response, next:NextFunction) => {
      if (req.body.type === 'images' || req.body.type === 'videos') {
        if (!req.file) {
          return res.status(400).json({ errors: [{ msg: 'El archivo es requerido' }] });
        }   
      }
      next();
    },
    check('name', 'El nombre de la categoría es requerido').notEmpty(),
    check('images', 'El permiso de imágenes es requerido').isBoolean(),
    check('videos', 'El permiso de videos es requerido').isBoolean(),
    check('text', 'El permiso de texto es requerido').isBoolean(),
    validator
  ];
};

