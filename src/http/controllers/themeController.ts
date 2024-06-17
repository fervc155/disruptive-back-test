import { Request, Response } from 'express';
import { ThemeService } from '../../services/themeService';
import { Controller } from './controller';
import {AuthenticatedRequest} from '../types';

const service = new ThemeService();

export class ThemeController   {
  

  public async getAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const data = await service.getAll();
      res.status(200).json(data);
    } catch (error:any) {
      console.error(error);
      res.status(error.statusCode || 500).json({ error: error.message || 'Hubo un error en el servidor' }); 
    }
  }

  public async search(req: Request, res: Response): Promise<void> {
    try {
      const data = await service.search(req.query);
      if (!data) {
        res.status(404).json({ message: 'Datos no encontrados' });
        return;
      }
      res.status(200).json(data);
    } catch (error:any) {
      console.error(error);
      res.status(error.statusCode || 500).json({ error: error.message || 'Hubo un error en el servidor' }); 
    }
  }

  public async getById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await service.getById(id);
      if (!data) {
        res.status(404).json({ message: 'Datos no encontrados' });
        return;
      }
      res.status(200).json(data);
    } catch (error:any) {
      console.error(error);
      res.status(error.statusCode || 500).json({ error: error.message || 'Hubo un error en el servidor' }); 
    }
  }

  public async create(req: AuthenticatedRequest & Request, res: Response): Promise<void> {
    try {
      if(req.file){
        req.body.url = req.file.path;
      }
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
