import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {User} from './models/userModel.js';

const RETRY_DELAY = 2000; // Delay between retries in milliseconds to cnnect to MongoDB

const app = express();
app.use(cors());
app.use(bodyParser.json());


const mongoConnect = async () => {
    while(true){
        try{
            await mongoose.connect('mongodb://localhost:27017/',{
                serverSelectionTimeoutMS: 3000
            })
            console.log('Connected to MongoDB');
            break;
        }
        catch(err){
            console.error(`MongoDB connection failed. Retrying in ${RETRY_DELAY / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying

        }
    }
}
mongoose.connection.on('disconnected', () => {
    mongoConnect();
});

mongoConnect()

app.get('/echo', (req, res) => {
    res.json('health')
})

app.post('/register', (req,res) => {
    const {name, email, password } = req.body
    console.log(`name: ${name}, email: ${email}, password: ${password}`)
    const newUser = new User({name, mail: email, pass: password})
    console.log(newUser)
    newUser.save().then(() => {
        console.log('Document saved and database created');
    }).catch((err) => {
        console.error('Error saving document', err);
    });
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

