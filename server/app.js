import express from 'express';
import mongoConnect from './config/db.js';
import {authRoutes} from './routes/authRoutes.js';
import {productRoutes} from './routes/productRoutes.js';
import mongoose from "mongoose";

const app = express();

mongoose.connection.on('disconnected', () => {
    mongoConnect();
});
mongoConnect();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
