import User from '../user';
import bcrypt from 'bcryptjs';

const userSeeder = async () => {
    try {
        const users = await User.find();

        if (!users.length) {
            const admin = new User({
                username: 'admin',
                email: 'admin@admin.com',
                password:  await bcrypt.hash('root1234', 12),
                role:'admin'
            });

            await admin.save();

            const creator = new User({
                username: 'creator',
                email: 'creator@creator.com',
                password:  await bcrypt.hash('root1234', 12),
                role:'creator'
            });

            await creator.save();



            const reader = new User({
                username: 'reader',
                email: 'reader@reader.com',
                password:  await bcrypt.hash('root1234', 12),
                role:'reader'
            });

            await reader.save();



            console.log('Usuarios  creados.');
        } else {
            console.log('Usuarios ya existen.');
        }
    } catch (error) {
        console.error('Error creando usuarios admin:', error);
    }
};

export default userSeeder;
