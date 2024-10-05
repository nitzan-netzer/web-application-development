'use server';
import Cart from '@/srccomponents/Cart';

export default async function cartApp() {
    // const products = localStorage getItem('products');
    return (
        <div className="cartApp">
            <Cart />
        </div>
    )
}
