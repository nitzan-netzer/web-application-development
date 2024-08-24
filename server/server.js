const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const RETRY_DELAY = 2000; // Delay between retries in milliseconds to cnnect to MongoDB

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoConnect = async () => {
    while(true){
        try{
            await mongoose.connect('mongodb://localhost:27017/productsDB',{
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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
 