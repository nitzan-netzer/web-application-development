import mongoose from "mongoose";
import { Product } from '../models/product.js';
import { v4 as uuid } from 'uuid';

export async function createInitialData() {
    const products = [];

    for (let i = 1; i <= 20; i++) {
        products.push({
            name: `Product ${i}`,
            image: `https://via.placeholder.com/150?text=Product+${i}`,
            category: `Category ${Math.floor((i - 1) / 4) + 1}`,
            status: 'available',
            description: `Description for product ${i}`,
            price: Math.floor(Math.random() * 1000) + 1, // Random price between 1 and 1000
            userId: uuid(),
            productId: uuid(),
            quantity: Math.floor(Math.random() * 100) + 1 // Random quantity between 1 and 100
        });
    }

    for (let i = 1; i <= 20; i++) {
        products.push({
            name: `Product ${i}`,
            image: `https://via.placeholder.com/150?text=Product+${i}`,
            category: `Category ${Math.floor((i - 1) / 4) + 1}`,
            status: 'soldOut',
            description: `Description for product ${i}`,
            price: Math.floor(Math.random() * 1000) + 1, // Random price between 1 and 1000
            username: "dana",
            userId: uuid(),
            productId: uuid(),
            quantity: Math.floor(Math.random() * 100) + 1 // Random quantity between 1 and 100
        });
        products.push({
            name: `Product ${i}`,
            image: `https://via.placeholder.com/150?text=Product+${i}`,
            category: `Category ${Math.floor((i - 1) / 4) + 1}`,
            status: 'soldOut',
            description: `Description for product ${i}`,
            price: Math.floor(Math.random() * 1000) + 1, // Random price between 1 and 1000
            username: "nitzan",
            userId: uuid(),
            productId: uuid(),
            quantity: Math.floor(Math.random() * 100) + 1 // Random quantity between 1 and 100
        });
        products.push({
            name: `Product ${i}`,
            image: `https://via.placeholder.com/150?text=Product+${i}`,
            category: `Category ${Math.floor((i - 1) / 4) + 1}`,
            status: 'soldOut',
            description: `Description for product ${i}`,
            price: Math.floor(Math.random() * 1000) + 1, // Random price between 1 and 1000
            username: "einav",
            userId: uuid(),
            productId: uuid(),
            quantity: Math.floor(Math.random() * 100) + 1 // Random quantity between 1 and 100
        });
    }

    try {
        await Product.insertMany(products);
        console.log('Initial data inserted successfully');
    } catch (error) {
        console.log('Error inserting initial data:', error);
    } finally {
        await mongoose.connection.close();
    }
}
