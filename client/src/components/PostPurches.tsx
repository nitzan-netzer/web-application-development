'use client';

import React, { useMemo } from 'react';
import styles from '../styles/postPurches.module.css';
import { Product } from '@/srctypes/products.type';

export default function PostPurches() {
    const purchasedProducts: Product[] = [
        { name: 'חולצה', price: 100, imageUrl: '/images/shirt.png' }, 
        { name: 'נעליים', price: 250, imageUrl: '/images/shoes.png' }
    ];

    const sumPrice = useMemo(() => purchasedProducts.reduce((acc, curr) => 
        acc + curr.price, 0
    ), [purchasedProducts]);

    const initMap = () => {
        const mapOptions = {
            zoom: 10,
            center: { lat: 32.0853, lng: 34.7818 }, 
        };
        const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    };

    React.useEffect(() => {
        if (window.google) {
            initMap();
        }
    }, []);

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
                <h2>כתובת המשלוח:</h2>
                <div id="map" className={styles.map}></div>
            </div>
        </div>
    );
}
