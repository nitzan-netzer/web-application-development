'use server';

import React from "react";
import PeresentProducts from "@/srccomponents/productsPage";
import  {getSession}  from '@/srcapp/lib/session'

export default async function Products() {
  const session = await getSession();
  const token = session?.token; 
  console.log(token)
  let data = await fetch('http://localhost:3001/api/product/allProducts',{
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }
  });
  let allProducts = await data.json(); 

  return (
    <div className="App">
      <main>
        <PeresentProducts data={allProducts}/>
      </main>
    </div>
  );
}