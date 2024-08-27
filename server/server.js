const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');

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

// Create a new item (protected)
app.post('/items', [auth, upload.single('image')], (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: `/uploads/${req.file.filename}`,
        seller: req.user.id
    });
    newItem.save((err) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send("Item added successfully");
    });
});

// Purchase an item
app.post('/items/:id/purchase', auth, (req, res) => {
    Item.findById(req.params.id, (err, item) => {
        if (err) return res.status(500).send(err);
        if (!item) return res.status(404).send('Item not found');

        // Logic to handle purchase (e.g., mark item as sold, append buyer information, etc.)
        // This can be expanded based on specific buy/sell flows you want to implement
        res.status(200).send('Item purchased successfully');
    });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

