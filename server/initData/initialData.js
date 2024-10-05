import mongoose from "mongoose";
import { Product } from '../models/product.js';
import { v4 as uuid } from 'uuid';
import { LOCATIONS, JEWLS_PICS, TOYS_PICS, CLOTHING_PICS, SPORT_PICS, ELECTRICAL_PICS } from './consts.js';

export async function createInitialData() {
    await createProductInitialData();
}

async function createProductInitialData() {
    await createProducts("Jewelry", "Or Cohen Naznin", "available", JEWLS_PICS.slice(0,4), 0);
    await createProducts("Jewelry", "Or Cohen Naznin", "soldOut", JEWLS_PICS.slice(5,9), 1);
    await createProducts("Clothes", "Rotem Raz", "available", CLOTHING_PICS.slice(0,4), 2);
    await createProducts("Clothes", "Rotem Raz", "soldOut", CLOTHING_PICS.slice(5,9), 0);
    await createProducts("Toys", "Dana Cohen", "available", TOYS_PICS.slice(0,4), 1);
    await createProducts("Toys", "Dana Cohen", "soldOut", TOYS_PICS.slice(5,9), 2);
    await createProducts("Sport Products", "Adir Itzhaki", "available", SPORT_PICS.slice(0,1), 0);
    await createProducts("Sport Products", "Adir Itzhaki", "soldOut", SPORT_PICS.slice(2,3), 1);
    await createProducts("Electrical Products", "Einav Haimovich", "available", SPORT_PICS.slice(0,2), 2);
    await createProducts("Electrical Products", "Einav Haimovich", "soldOut", SPORT_PICS.slice(3,5), 0);
}

async function createProducts(category, sellerName, status, photosArray, locationIndex){
    const products = [];
    for (let i = 1; i <= photosArray.length; i++) {
        const { lng, lat } = LOCATIONS[locationIndex];

        products.push({
            name: `Product ${i}`,
            image: photosArray[i],
            category,
            status,
            description: `Description for product ${i}`,
            price: Math.floor(Math.random() * 1000) + 1,
            username: sellerName,
            userId: uuid(),
            productId: uuid(),
            quantity: Math.floor(Math.random() * 100) + 1,
            location: {
                type: 'Point',
                coordinates: [lng, lat]
            }
        });
    }
    await Product.insertMany(products);
}
