import React from 'react'
import ToolKitAdmin from '@/srccomponents/toolkitAdmin'
import ToolKitSaller from '@/srccomponents/toolkitSaller'
import {getAllStatistics } from '@/srcactions/getAllStatistics'
import  {getSession}  from '@/srcapp/lib/session'

export default async function ToolKitApp() {
    const session = await getSession(); 
    const isAdmin = session?.user['isAdmin']
    if (isAdmin) 
        {

            const data = await getAllStatistics();
            return (
                <div className="toolkitAdmin">
                    <main>
                        <ToolKitAdmin data={data} /> {}
                    </main>
                </div> 
            )
        }
    else
    {
        return (
            <div className="toolkitSaller">
                <ToolKitSaller />
            </div>
        );
    }
}
