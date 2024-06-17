import {validator} from './validator';
import { validationResult, check, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';




export const create = () => {
  return [
    check('name', 'El nombre de la categoría es requerido').notEmpty(),
    validator
  ];
};

export const update = () => {
  return [
    check('name').optional().notEmpty().withMessage('El nombre de la categoría es requerido'),
    validator
  ];
};
