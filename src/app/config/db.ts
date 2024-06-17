import mongoose from 'mongoose';

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || '', {});
        console.log('Conexión a MongoDB Atlas establecida');
    } catch (error:any) {
        console.error('Error al conectar a MongoDB Atlas:', error.message);
        process.exit(1);
    }
};

export default conectarDB;
