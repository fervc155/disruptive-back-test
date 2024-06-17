import {validator} from './validator';
import { validationResult, check, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';



export const create = () => {
  return [
    check('username', 'El nombre de usuario es requerido').notEmpty(),
    check('email', 'El correo electrónico es requerido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('role', 'El rol del usuario no es válido').optional().isIn(['reader', 'creator', 'admin']),
    validator
  ];
};

export const update = () => {
  return [
    check('username', 'El nombre de usuario es requerido').optional().notEmpty(),
    check('email', 'El correo electrónico es requerido').optional().isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').optional().isLength({ min: 6 }),
    check('role', 'El rol del usuario no es válido').optional().isIn(['reader', 'creator', 'admin']),
    validator
  ];
};
