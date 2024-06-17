import bcrypt from 'bcryptjs';
import User from '../models/user';

export class UserService {
  
  public async getAll(): Promise<any[]> {
    return await User.find({}, '-password');
  }

  public async create(userData: any, auth: any): Promise<void> {

    const { username, email, password, role } = userData;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new Error('El usuario o el correo ya están registrados');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();
  }

  public async update(userId: string, userData: any, auth: any): Promise<void> {


    const { username, email, password, role } = userData;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 12);
    }
    if (userData.role === 'admin' && role) {
      user.role = role;
    }
    await user.save();
  }

  public async delete(userId: string): Promise<void> {

    await User.findByIdAndDelete(userId);
  }
}
