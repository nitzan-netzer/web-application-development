'use client';

import React, { useMemo, useState } from 'react';
import styles from '../styles/cart.module.css';
import { Product } from '@/srctypes/products.type';

export default function Cart() {
    // TODO: should hold somewhere chosen products state and use it here. can be context or localStorage or anything else
    const [chosenProducts, setChosenProducts] = useState<Product[]>([{name: 'אורי', price: 100}, {name: 'אור', price: 5}])
    const sumPrice = useMemo(() => chosenProducts.reduce((acc, curr) => 
            acc + curr.price, 0
        ),[chosenProducts])

 return <div className={styles['cart-container']}>
    <div className={styles['cart-header']}>
        סל הקניות שלי
    </div>
    {chosenProducts.map((product, index) => {
        return (
            <div className={styles['cart-product']}>
                <div className={styles['product-detail']}>
                    שם המוצר:{product.name}
                </div>
                <div className={styles['product-detail']}>
                    מחיר:{product.price}
                </div>
                <button onClick={() => setChosenProducts(prev => prev.splice(index, 1))}>פח אשפה</button>
            </div>
        )
    })}
    <div>
        סה"כ: {sumPrice}
    </div>
 </div>   
}

