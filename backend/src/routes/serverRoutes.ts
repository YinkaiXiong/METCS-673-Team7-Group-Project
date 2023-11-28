import express, { Request, Response } from 'express';
import {ServerController} from '../controllers/serverController';
const serverRouter = express.Router();
const serverController= new ServerController();
serverRouter.post('/addServer', serverController.addServer);

serverRouter.get('/getAllServers', serverController.getAllServers);
serverRouter.patch('/updateServer', serverController.updateServer);
serverRouter.delete('/deleteServer', serverController.deleteServer);
serverRouter.post('/addServer', serverController.addServer);
serverRouter.get('/getServerData', serverController.getServerData);

module.exports = serverRouter;
