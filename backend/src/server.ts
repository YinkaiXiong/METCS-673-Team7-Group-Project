import express, { Express, Request, Response } from 'express';

const userRoutes = require('./routes/userRoutes');
const serverRoutes = require('./routes/serverRoutes');

require('dotenv').config();


function createServer(){

    const app: Express = express();
    const cors = require("cors");
    const corsOptions = {
        origin: "http://localhost:9000"
    };
    
   
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use('/user', userRoutes)
    app.use('/server', serverRoutes)
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello, this is Express + TypeScript');
    });
    return app;
}
export default createServer;

