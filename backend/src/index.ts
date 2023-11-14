import express, { Express, Request, Response } from 'express';
import mongoose from "mongoose";


require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const serverRoutes = require('./routes/serverRoutes');
const app: Express = express();
const port = 3000;
const mongoString = process.env.MONGODB_URL!;
const cors = require("cors");
const corsOptions = {
	origin: "http://localhost:9000"
};

mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(cors(corsOptions));
app.use(express.json());
app.use('/user', userRoutes)
app.use('/server', serverRoutes)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, this is Express + TypeScript');
});

app.listen(3000, () => {
    console.log(`Server Started at ${port}`)
})



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