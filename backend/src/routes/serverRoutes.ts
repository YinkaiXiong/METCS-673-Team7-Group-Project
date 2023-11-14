import express, { Request, Response } from 'express';
const serverController= require('../controllers/serverController');
const serverRouter = express.Router();

serverRouter.post('/addServer', serverController.addServer);

serverRouter.get('/getAllServers', serverController.getAllServers);
serverRouter.patch('/updateServer', serverController.updateServer);
serverRouter.delete('/deleteServer', serverController.deleteServer);
serverRouter.post('/addServer', serverController.addServer);
serverRouter.get('/getServerData', serverController.getServerData);

module.exports = serverRouter;
