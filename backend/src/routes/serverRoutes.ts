import express, { Request, Response } from 'express';
import {ServerController} from '../controllers/serverController';
const serverRouter = express.Router();
const serverController= new ServerController();

serverRouter.get('/getAllServers', serverController.getAllServers); //done
serverRouter.patch('/updateServer', serverController.updateServer); 
serverRouter.post('/addServer', serverController.addServer); //done
serverRouter.delete('/deleteServer', serverController.deleteServer); //done
serverRouter.get('/getServerData', serverController.getServerData);

module.exports = serverRouter;
