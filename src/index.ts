import express from 'express';
import bodyParser from 'body-parser';
import conectarDB from './app/config/db';
import conectarDBTest from './app/config/db_test';
import routesApi from './http/routes/api';
import runSeeders from './models/seeders';
import cors from 'cors';
require('dotenv').config();

const app = express();
let PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use('/uploads', express.static('uploads'));

app.use(cors());


app.use('/api', routesApi());

const prod = process.env.NODE_ENV=="prod"

if(!prod){
    conectarDBTest()
} else{
    conectarDB().then(() => {
        if (process.env.RUN_SEEDER) {
            runSeeders();
        }
    });

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });

   
}

export default app;