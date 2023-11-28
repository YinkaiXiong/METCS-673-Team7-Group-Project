import mongoose from "mongoose";

const port = 3000;
import createServer from "./server";

const mongoString = process.env.MONGODB_URL!;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = createServer();
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