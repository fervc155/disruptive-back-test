import {validator} from './validator';
import { validationResult, check, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const register = () => {
  return [
    check('username', 'El nombre de usuario es requerido').notEmpty(),
    check('email', 'El correo electrónico no es válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('role', 'El rol es requerido').notEmpty(),
    validator
  ];
};

export const login = () => {
  return [
    check('email', 'El correo electrónico no es válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').optional().isLength({ min: 6 }),
    validator, 
  ];
};