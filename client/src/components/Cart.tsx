'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from '../styles/cart.module.css';
import { Product } from '@/srctypes/products.type';

export default function Cart() {
    const [chosenProducts, setChosenProducts] = useState<Product[]>([
        { name: 'אורי', price: 100, imageUrl: '/images/product1.png' }, 
        { name: 'אור', price: 5, imageUrl: '/images/product2.png' }
    ]);

    const sumPrice = useMemo(() => chosenProducts.reduce((acc, curr) => 
        acc + curr.price, 0
    ), [chosenProducts]);

    const router = useRouter();

    const handlePurchase = () => {
        router.push('/postPurches');
    };

    return (
        <div className={styles.cartContainer}>
            <div className={styles['cart-content']}>
                <div className={styles['cart-header']}>
                    סל הקניות שלי
                </div>
                {chosenProducts.length > 0 ? (
                    chosenProducts.map((product, index) => {
                        return (
                            <div className={styles['cart-product']} key={index}>
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    className={styles['product-image']}
                                />
                                <div className={styles['product-detail']}>
                                    <span>שם המוצר:</span> {product.name}
                                </div>
                                <div className={styles['product-detail']}>
                                    <span>מחיר:</span> ₪{product.price}
                                </div>
                                <button 
                                    className={styles['remove-button']} 
                                    onClick={() => {
                                        setChosenProducts(prev => prev.filter((_, i) => i !== index));
                                    }}>
                                    🗑  
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <div className={styles['empty-cart']}>הסל ריק</div>
                )}

                <div className={styles['total-price']}>
                    סה"כ: ₪{sumPrice}
                </div>

                <button 
                    className={styles['purchase-button']} 
                    onClick={handlePurchase} 
                >
                    לרכישה
                </button>
                
            </div>
        </div>
    );
}
