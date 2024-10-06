'use client';

import { useRouter } from 'next/navigation'; 
import styles from '../styles/cart.module.css';
import React, { useMemo, useState, useEffect } from 'react';
import { makeTransaction } from "@/srcapi/nitApi";
import { nis2usd } from "@/srcapi/nitApi";

type Props = {
    products: Product[];
};

interface productLocation {
    type : string;
    coordinates: Array<number>;
}
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

const Cart: React.FC<Props> = () => {    
    const [chosenProducts, setChosenProducts] = useState<Product[]>([]);
    const [usdPrice, setUsdPrice] = useState<number | null>(null); 
    const [isConverting, setIsConverting] = useState<boolean>(false); 

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

    

    const handlePurchase = async (products : Product[]) => {
        
        console.log("Cart : ", chosenProducts);

        const productsToPurchase = products.map(({ productId, quantity }) => ({ productId, quantity }));
        
        console.log("productsToPurchase : ", productsToPurchase);

        try {
            
            await makeTransaction(productsToPurchase);
    
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

    const handleConvertToUSD = async () => {
        setIsConverting(true); 
        try {
            const convertedPrice = await nis2usd(sumPrice); 
            setUsdPrice(convertedPrice);
        } catch (error) {
            console.error('Error converting NIS to USD:', error);
            alert('שגיאה בהמרת הסכום לדולרים.');
        } finally {
            setIsConverting(false); 
        }
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
                                    <span>שם המוצר:</span> {product.productId}
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
                    className={styles['convert-button']} 
                    onClick={handleConvertToUSD}
                    disabled={isConverting} 
                > 
                    {isConverting ? 'ממיר לדולרים...' : 'המרה לדולרים'}
                </button>

                {usdPrice !== null && (
                    <div className={styles['usd-price']}>
                        סה"כ בדולרים: ${usdPrice.toFixed(2)}
                    </div>
                )}

                <button 
                    className={styles['purchase-button']} 
                    onClick={() => handlePurchase(chosenProducts)} 
                > 
                    לרכישה
                </button>
                
            </div>
        </div>
    );
};

export default Cart;
