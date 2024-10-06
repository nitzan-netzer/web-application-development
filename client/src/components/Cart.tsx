'use client';

import { useRouter } from 'next/navigation'; 
import styles from '../styles/cart.module.css';
import React, { useMemo, useState, useEffect } from 'react';
import { makeTransaction } from "@/srcapi/nitApi";

type Props = {
    products: Product[];
};

interface Product {
    location: object;
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

const Cart: React.FC<Props> = () => {    
    const [chosenProducts, setChosenProducts] = useState<Product[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('shopping cart');
        if (storedCart) {
            setChosenProducts(JSON.parse(storedCart));
        }
    }, []);

    const sumPrice = useMemo(() => chosenProducts.reduce((acc, curr) => 
        acc + curr.price, 0
    ), [chosenProducts]);

    const router = useRouter();

    const handlePurchase = async () => {
        try {
            for (const product of chosenProducts) {
                await makeTransaction(product.productId, product.quantity);
            }
    
            localStorage.setItem('purchasedProducts', JSON.stringify(chosenProducts));
    
            router.push('/postPurches');
        } catch (error) {
            console.error('Error during purchase:', error);
            alert('התרחשה שגיאה בזמן הרכישה. נסה שוב מאוחר יותר.');
        }
    };

    const removeProduct = (index: number) => {
        const updatedProducts = chosenProducts.filter((_, i) => i !== index);
        setChosenProducts(updatedProducts);
        localStorage.setItem('shopping cart', JSON.stringify(updatedProducts));
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
                                    src={product.image} 
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
                                    onClick={() => removeProduct(index)}>
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
};

export default Cart;
