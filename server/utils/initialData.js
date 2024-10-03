import mongoose from "mongoose";
import { Product } from '../models/product.js';
import { v4 as uuid } from 'uuid';

const LOCATIONS = [
    {
        lat: "32.069130",
        lng:  "34.774180"
    },
    {
        lat: "31.979700",
        lng: "34.770830"
    },
    {
        lat: "31.968987",
        lng: "34.770725",
    }
];

export async function createInitialData() {
    await createProductInitialData();
}

async function createProductInitialData() {
    const products = [];

    for (let i = 1; i <= 50; i++) {
        const locationIndex = i % 2 === 0 ? 0 : 1;
        const { lng, lat } = LOCATIONS[locationIndex];

        products.push({
            name: `Product ${i}`,
            image: `https://via.placeholder.com/150?text=Product+${i}`,
            category: `Toys`,
            status: 'available',
            description: `Description for product ${i}`,
            price: Math.floor(Math.random() * 1000) + 1,
            userId: uuid(),
            username: "Dana",
            productId: uuid(),
            quantity: Math.floor(Math.random() * 100) + 1,
            location: {
                type: 'Point',
                coordinates: [lng, lat]
            }
        });
    }
    for (let i = 1; i <= 20; i++) {
        const locationIndex = i % 2 === 0 ? 1 : 2;
        const { lng, lat } = LOCATIONS[locationIndex];

        products.push({
            name: `Product ${i}`,
            image: `jewelry`,
            category: `Category ${Math.floor((i - 1) / 4) + 1}`,
            status: 'soldOut',
            description: `Description for product ${i}`,
            price: Math.floor(Math.random() * 1000) + 1, // Random price between 1 and 1000
            username: "Or",
            userId: uuid(),
            productId: uuid(),
            quantity: Math.floor(Math.random() * 100) + 1,
            location: {
                type: 'Point',
                coordinates: [lng, lat]
            }
        });
        products.push({
            name: `Product ${i}`,
            image: `https://via.placeholder.com/150?text=Product+${i}`,
            category: `electrical`,
            status: 'soldOut',
            description: `Description for product ${i}`,
            price: Math.floor(Math.random() * 1000) + 1, // Random price between 1 and 1000
            username: "Einav",
            userId: uuid(),
            productId: uuid(),
            quantity: Math.floor(Math.random() * 100) + 1, // Random quantity between 1 and 100
            location: {
                type: 'Point',
                coordinates: [lng, lat]
            }
        });
        products.push({
            name: `Product ${i}`,
            image: `https://via.placeholder.com/150?text=Product+${i}`,
            category: `clothes`,
            status: 'soldOut',
            description: `Description for product ${i}`,
            price: Math.floor(Math.random() * 1000) + 1, // Random price between 1 and 1000
            username: "Rotem",
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
    }
}

