'use server';

import { myOrigin, apiCreate } from '@/srcapi/constApi';
import { getSession } from '@/srcapp/lib/session';

export async function createProduct(name: string, image: string, category: string, description: string, price: number, quantity: number) {
    const session = await getSession();
    const token = session?.token;

    if (typeof token !== 'string') {
        throw new Error('Invalid token type');
    }

    const userId = session?.user['userId'];

    const url = `${myOrigin}${apiCreate}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        },
        body: JSON.stringify({
            name,
            image,
            category,
            status: 'available', // Assuming status is fixed
            description,
            price,
            userId,
            quantity,
        }),
    });

    if (!response.ok) {
        throw new Error(`Error creating product: ${response.status}`);
    }

    const data = await response.json();
    return data;
}
