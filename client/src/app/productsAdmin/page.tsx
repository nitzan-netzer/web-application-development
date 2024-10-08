'use server';

import React from "react";
import ProductsPageAdmin from "@/srccomponents/productsPageAdmin";
import {getAllProducts} from "@/srcapi/nitApi";
import { getSession}  from '@/srcapp/lib/session' 
import { Session } from '@/srctypes/session.type'

export default async function Products() {
  const session = await getSession();
  if (!session) {
      throw new Error('Session is missing.');
  }

  const curr_user = session.user as Session['user'];
  const isAdmin = curr_user.isAdmin;

  if (isAdmin) {
    const data = await getAllProducts();
    return (
      <div className="App">
        <main>
          <ProductsPageAdmin allProducts={data}/>
        </main>
      </div>
    );
  }

  else {
    return (
      <div className="App">
        אין לך הרשאה להיכנס לאזור הזה
      </div>
    );
  }
}