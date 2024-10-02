'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

import styles from '../styles/postPurches.module.css';
import { Product } from '@/srctypes/products.type';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function PostPurches() {
    const purchasedProducts: Product[] = [
        { name: 'חולצה', price: 100, imageUrl: '/images/shirt.png' }, 
        { name: 'נעליים', price: 250, imageUrl: '/images/shoes.png' }
    ];

    const locations = [
        {
            address: 'מרכז תל אביב',
            latitude: 32.0853,
            longitude: 34.7818,
        },
        {
            address: 'חיפה',
            latitude: 32.7940,
            longitude: 34.9896,
        }
    ];

    const sumPrice = useMemo(() => purchasedProducts.reduce((acc, curr) => 
        acc + curr.price, 0
    ), [purchasedProducts]);

    return (
        <div className={styles.orderSummaryContainer}>
            <h1>סיכום ההזמנה</h1>

            <div className={styles.productList}>
                <h2>הפריטים שנרכשו:</h2>
                {purchasedProducts.map((product, index) => (
                    <div key={index} className={styles.productItem}>
                        <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
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
                    <Map locations={locations} />
                </div>
            </div>
        </div>
    );
}
