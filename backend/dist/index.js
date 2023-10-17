"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const routes = require('./routes/userRoutes');
const app = (0, express_1.default)();
const port = 3000;
const mongoString = process.env.MONGODB_URL;
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:9000"
};
mongoose_1.default.connect(mongoString);
const database = mongoose_1.default.connection;
database.on('error', (error) => {
    console.log(error);
});
database.once('connected', () => {
    console.log('Database Connected');
});
app.use(cors(corsOptions));
app.use(express_1.default.json());
app.use('/user', routes);
app.get('/', (req, res) => {
    res.send('Hello, this is Express + TypeScript');
});
app.listen(3000, () => {
    console.log(`Server Started at ${port}`);
});
// app.listen(port, ()=> {
// console.log(`[Server]: I am running at https://localhost:${port}`);
// });
// console.log(mongoString)
// mongoose.connect(
//     mongoString,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
// );
// const studentSchema = new mongoose.Schema({
//     roll_no: {
//         type: Number,
//         required: true
//     },
//     name: String,
//     year: Number,
//     subjects: [String]
// });
// const Student = mongoose.model('users', studentSchema);
// const stud = new Student({
//     roll_no: 1001,
//     name: 'Madison Hyde',
//     year: 3,
//     subjects: ['DBMS', 'OS', 'Graph Theory', 'Internet Programming']
// });
// stud
//     .save()
//     .then(
//         () => console.log("One entry added"), 
//         (err: any) => console.log(err)
//     );
//     app.get('/', (req, res) => {
//         Student.find({}, (err: any, found: any) => {
//             if (!err) {
//                 res.send(found);
//             }
//             console.log(err);
//             res.send("Some error occured!")
//         }).catch((err: string) => console.log("Error occured, " + err));
//     });
