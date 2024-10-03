import React from 'react'
import ToolKitAdmin from '@/srccomponents/toolkitAdmin'
import ToolKitSaller from '@/srccomponents/toolkitSaller'
import { getAllStatistics } from '@/srcapi/nitApi'
import { getSession}  from '@/srcapp/lib/session'
import { Session } from '@/srctypes/session.type'
import { tree } from 'next/dist/build/templates/app-page'

export default async function ToolKitApp() {
    const session = await getSession();
    if (!session) {
        throw new Error('Session is missing.');
    }
    const user = session.user as Session['user'];
    const isAdmin = user.isAdmin;
    const isSaller = user.isSaller;
    if (false) 
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
    else if (true)
    {
        return (
            <div className="toolkitSaller">
                <ToolKitSaller />
            </div>
        );
    }
    else
    {
        return (
            <div className="toolkitUser">
                <h1> You are not authorized to access this page</h1>
            </div>
        );
    }
}
