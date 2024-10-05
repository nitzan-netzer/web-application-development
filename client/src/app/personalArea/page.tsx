'use server';
import React from 'react'
import PersonalDetails from "@/srccomponents/PersonalDetails";

export default async function personalDetails() {
    return (
        <div className="personalDetails">
            <PersonalDetails />
        </div>
    )
}
