import { Request, Response } from 'express';
import { AuthService } from '../../services/authService';
import { CustomError} from '../exceptions';

const authService = new AuthService();

export class AuthController {
  
  public async register(req: Request, res: Response): Promise<void> {
    try {

      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (error:any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Hubo un error en el servidor' }); 
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { token, user } = await authService.login(email, password);
      res.status(200).json({ token, user });
    } catch (error:any) {
      console.error(error);
      res.status(error.statusCode || 500).json({ error: error.message || 'Hubo un error en el servidor' }); 
    }
  }
}
