"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes = require('./routes/userRoutes');
const serverRoutes = require('./routes/serverRoutes');
require('dotenv').config();
function createAppServer() {
    const app = (0, express_1.default)();
    const cors = require("cors");
    const corsOptions = {
        origin: "http://localhost:3001"
    };
    app.use(cors(corsOptions));
    app.use(express_1.default.json());
    app.use('/user', userRoutes);
    app.use('/server', serverRoutes);
    app.get('/', (req, res) => {
        res.send('Hello, this is Express + TypeScript');
    });
    return app;
}
exports.default = createAppServer;
