'use server';
import React from 'react'
import Policy from "@/srccomponents/Policy";

export default async function policyApp() {
    return (
        <div className="policyApp">
            <Policy />
        </div>
    )
}
