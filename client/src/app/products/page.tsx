'use server';

import React from "react";
import ProductsPage from "@/srccomponents/productsPage";
import {getAllProducts} from "@/srcapi/nitApi";
import { getSession}  from '@/srcapp/lib/session' 
import { Session } from '@/srctypes/session.type'

export default async function Products() {
  const session = await getSession();
    if (!session) {
        throw new Error('Session is missing.');
    }

    const user = session.user as Session['user'];
    const isAdmin = user.isAdmin;

    const data = await getAllProducts();
      return (
        <div className="App">
          <main>
            <ProductsPage allProducts={data}/>
          </main>
        </div>
      );

}