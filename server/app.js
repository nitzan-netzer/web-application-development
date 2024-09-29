import express from 'express';
import {mongoConnect} from './config/db.js';
import {authRoutes} from './routes/authRoutes.js';
import {productRoutes} from './routes/productRoutes.js';
import {purchaseRoutes} from "./routes/purchaseRoutes.js";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express"
import swaggerDoc from "./defenitions/swagger.json" assert { type: "json" }
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import {createInitialData} from "../server/utils/initialData.js";

const app = express();
const corsOptions = {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
    allowedHeaders: '*', // Allow any headers
};

app.use(cors(corsOptions));

mongoose.connection.on('error', () => {
    mongoConnect();
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('disconnected', () => {
    mongoConnect();
});
mongoConnect();
await createInitialData();


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/purchase', purchaseRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/api/public', express.static(path.join(__dirname, 'uploads')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
