'use client';

import React, { useMemo, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import styles from '../styles/postPurches.module.css';

type Props = {
    products: Product[];
};

interface Product {
    location: productLocation;
    name: string;
    image: string;
    category: string;
    status: string;
    description: string;
    price: number;
    userId: string;
    productId: string;
    quantity: number;
}

interface locationForMap {
    address: string;
    latitude: number;
    longitude: number;
}

interface productLocation {
    type : string;
    coordinates: Array<number>;
}

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function PostPurches() {
    const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([]);

    useEffect(() => {
        const storedProducts = localStorage.getItem('purchasedProducts');
        if (storedProducts) {
            setPurchasedProducts(JSON.parse(storedProducts));
        }
    }, []);

    const sumPrice = useMemo(() => purchasedProducts.reduce((acc, curr) => 
        acc + curr.price, 0
    ), [purchasedProducts]);

    const Products: Product[] = JSON.parse(localStorage.getItem('purchasedProducts') || '[]');
    
    let productsLocations : locationForMap[] = [];

    for (let i = 0; i < Products.length; i++) {
        productsLocations.push({
            address: Products[i].name,
            latitude: Products[i].location.coordinates[1],
            longitude: Products[i].location.coordinates[0],
        });
        
    }

    return (
        <div className={styles.orderSummaryContainer}>
            <h1>סיכום ההזמנה</h1>

            <div className={styles.productList}>
                <h2>הפריטים שנרכשו:</h2>
                {purchasedProducts.map((product, index) => (
                    <div key={index} className={styles.productItem}>
                        <img src={product.image} alt={product.name} className={styles.productImage} />
                        <div className={styles.productDetails}>
                            <span>שם המוצר: {product.name}</span>
                            <span>מחיר: ₪{product.price}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.totalPrice}>
                <h2>סכום ההזמנה:</h2>
                <span>₪{sumPrice}</span>
            </div>

            <div className={styles.mapContainer}>
                <h2>כתובת לאיסוף:  </h2>
                <div id="map" className={styles.map}>
                    <Map locations={productsLocations} />
                </div>
            </div>
        </div>
    );
}


