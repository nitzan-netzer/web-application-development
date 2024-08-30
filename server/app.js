import express from 'express';
import {mongoConnect} from './config/db.js';
import {authRoutes} from './routes/authRoutes.js';
import {productRoutes} from './routes/productRoutes.js';
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express"
import {swaggerSpec} from "./swagger.js"


const app = express();

mongoose.connection.on('disconnected', () => {
    mongoConnect();
});
mongoConnect();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);

});
