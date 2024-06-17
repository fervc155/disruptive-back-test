import { Request, Response } from 'express';
import { CategoryService } from '../../services/categoryService';
import { Controller } from './controller';
import {AuthenticatedRequest} from '../types';

const service = new CategoryService();

export class CategoryController   {
  

  public async getAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const data = await service.getAll();
      res.status(200).json(data);
    } catch (error:any) {
      console.error(error);
      res.status(error.statusCode || 500).json({ error: error.message || 'Hubo un error en el servidor' }); 
    }
  }


  public async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const newData = await service.create(req.body, req.user);
      res.status(201).json(newData);
    } catch (error:any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Hubo un error en el servidor' }); 
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(200).json({ message: 'Datos eliminados correctamente' });
    } catch (error:any) {
      console.error(error);
      res.status(error.statusCode || 500).json({ error: error.message || 'Hubo un error en el servidor' }); 
    }
  }
 
}
