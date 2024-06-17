import {validator, removeFileRequest} from './validator';
import { validationResult, check, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import * as path from 'path'
import {upload} from '../../app/config/multer';


export const create = () => {
  return [
    upload.single('file'),
    (req:Request, res:Response, next:NextFunction) => {
      if (req.body.type === 'images' || req.body.type === 'videos') {
        if (!req.file) {
          return res.status(400).json({ errors: [{ msg: 'El archivo es requerido' }] });
        }
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        if (req.body.type === 'images' && !['.webp', '.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension)) {
          removeFileRequest(req)
          return res.status(400).json({ errors: [{ msg: 'El archivo debe ser una imagen válida' }] });
        }
        if (req.body.type === 'videos' && !['.mp4', '.avi', '.mov', '.mkv'].includes(fileExtension)) {
          removeFileRequest(req)
          return res.status(400).json({ errors: [{ msg: 'El archivo debe ser un video válido' }] });
        }
      }
      next();
    },
    check('title', 'El título del contenido es requerido').notEmpty(),
    check('theme', 'El ID dela tematica es requerido').notEmpty().isMongoId(),
    check('category', 'El ID de la categoría es requerido').notEmpty().isMongoId(),
    check('type', 'El tipo de contenido es requerido').notEmpty().isIn(['text', 'images', 'videos']),
    check('text', 'El texto del contenido es requerido')
      .if((value, { req }) => req.body.type === 'text')
      .notEmpty(),
    validator
  ];
};
export const update = ()=> {
  return [
    check('title').optional().notEmpty().withMessage('El título del contenido es requerido'),
    check('theme').optional().isMongoId().withMessage('El ID de la tematica debe ser un ID válido'),
    check('type').optional().notEmpty().withMessage('El tipo de contenido es requerido'),
    check('category', 'El ID de la categoría es requerido').notEmpty().isMongoId(),
    check('url').optional().isURL().withMessage('La URL del contenido debe ser una URL válida'),
    check('text').optional().notEmpty().withMessage('El texto del contenido es requerido'),
    validator
  ];
};
