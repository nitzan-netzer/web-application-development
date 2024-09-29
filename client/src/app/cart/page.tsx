'use server';
import Cart from '@/srccomponents/Cart';

export default async function cartApp() {
    return (
        <div className="cartApp">
            <Cart />
        </div>
    )
}
