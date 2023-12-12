"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const port = 3000;
const server_1 = __importDefault(require("./server"));
const mongoString = process.env.MONGODB_URL;
mongoose_1.default.connect(mongoString);
const database = mongoose_1.default.connection;
database.on('error', (error) => {
    console.log(error);
});
database.once('connected', () => {
    console.log('Database Connected');
});
const app = (0, server_1.default)();
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
