import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../models/user';
import {Exceptions} from '../http/exceptions';

type AuthResponse= {
  token: string;
  user: object 
}


export class AuthService {
  
  private generateToken(user: UserDocument): string {
    return jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );
  }

  public async register({username, email, password, role }:any): Promise<AuthResponse> {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });


    if (existingUser) {
      Exceptions._400('El usuario ya existe');
    }

    if(!['reader', 'creator'].includes(role)){
        Exceptions._400('Elige un rol');    
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    const token = this.generateToken(newUser);

    return { token, user: { userId: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role } };
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    const token = this.generateToken(user);

    return { token, user: { userId: user._id, username: user.username, email: user.email, role: user.role } };
  }
}
