'use server';

import React from "react";
import UsersPage from "@/srccomponents/UsersPage";
import { getAllUsers } from "@/srcapi/nitApi";
export default async function Products() {
    
    const data = await getAllUsers();
    const users = data.users;

    return (
      <div className="App">
        <main>
          <UsersPage allUsers={users}/>
        </main>
      </div>
    );
  }
  