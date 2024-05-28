import express from 'express';
import cors from 'cors';
import startServer from './utils/startServer.js';
import router from './routes/index.js';

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
}));


app.use(express.json());

app.use('/api', router);

startServer(app);


