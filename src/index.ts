import express from 'express';
import bodyParser from 'body-parser';
import conectarDB from './app/config/db';
import routesApi from './http/routes/api';
import runSeeders from './models/seeders';
import cors from 'cors';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use('/uploads', express.static('uploads'));

app.use(cors());

conectarDB().then(() => {
    if (process.env.RUN_SEEDER) {
        runSeeders();
    }
});

app.use('/api', routesApi());

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
