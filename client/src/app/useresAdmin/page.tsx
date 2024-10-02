'use server';

import React from "react";

export default async function Products() {
    // Fetch data from the server
    // let data = await fetch('http://localhost:3001/api/product/allProducts',{
    //   headers: {
    //     'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmY5N2IyMTMwYWM3NjAxMjk2ZTRjZTQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzI3NjI2MjQ4LCJleHAiOjE3Mjc2Mjk4NDh9.s0R9gS45mfFgGXOQNAXl63MvnOg65nISImbIpBTAy8Q'
    //   }
    // });
    // let allProducts = await data.json(); // products is typed as any
    // console.log("allProducts", allProducts);
  
    return (
      <div className="App">
        <main>
          <PeresentProducts/>
        </main>
      </div>
    );
  }
  