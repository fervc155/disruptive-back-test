import mongoose from 'mongoose';

const conectarDBTest = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI_TEST || '', {});
        console.log('Conexión a MongoDB Atlas TEST establecida');            

    } catch (error:any) {
        console.error('Error al conectar a MongoDB Atlas:', error.message);
        process.exit(1);
    }
};

export default conectarDBTest;
