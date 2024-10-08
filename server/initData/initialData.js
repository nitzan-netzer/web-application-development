import mongoose from "mongoose";
import { Product } from '../models/product.js';
import { v4 as uuid } from 'uuid';
import { LOCATIONS, JEWLS_PICS, TOYS_PICS, CLOTHING_PICS, SPORT_PICS, ELECTRICAL_PICS } from './consts.js';

export async function createInitialData() {
    await createProductInitialData();
}

async function createProductInitialData() {
    await createProducts("תכשיטים", "Or Cohen Naznin", "available", JEWLS_PICS.slice(0,4), 0);
    await createProducts("תכשיטים", "Or Cohen Naznin", "soldOut", JEWLS_PICS.slice(5,9), 5);
    await createProducts("ביגוד ואופנה", "Rotem Raz", "available", CLOTHING_PICS.slice(0,4), 0);
    await createProducts("ביגוד ואופנה", "Rotem Raz", "soldOut", CLOTHING_PICS.slice(5,9), 5);
    await createProducts("משחקים וצעצועים", "Dana Cohen", "available", TOYS_PICS.slice(0,4), 0);
    await createProducts("משחקים וצעצועים", "Dana Cohen", "soldOut", TOYS_PICS.slice(5,9), 5);
    await createProducts("אביזרי ספורט", "Adir Itzhaki", "available", SPORT_PICS.slice(0,1), 0);
    await createProducts("אביזרי ספורט", "Adir Itzhaki", "soldOut", SPORT_PICS.slice(2,3), 2);
    await createProducts("מוצרי חשמל", "Einav Haimovich", "available", SPORT_PICS.slice(0,2), 0);
    await createProducts("מוצרי חשמל", "Einav Haimovich", "soldOut", SPORT_PICS.slice(3,5), 3);
}

async function createProducts(category, sellerName, status, photosArray, locationIndex){
    const products = [];
    for (let i = 1; i <= photosArray.length; i++) {

        let locationI = locationIndex + i;
        const { lng, lat } = LOCATIONS[locationI];

        products.push({
            name: `${category} ${i}`,
            image: photosArray[i],
            category,
            status,
            description: `מוצר נהדר ומקסים`,
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
