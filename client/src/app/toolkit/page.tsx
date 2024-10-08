import React from 'react'
import ToolKitAdmin from '@/srccomponents/toolkitAdmin'
import ToolKitSaller from '@/srccomponents/toolkitSaller'
import { getAllStatistics } from '@/srcapi/nitApi'
import { getSession } from '@/srcapp/lib/session'
import { Session } from '@/srctypes/session.type'
export default async function ToolKitApp() {
    const session = await getSession();
    if (!session) {
        throw new Error('Session is missing.');
    }

    const user = session.user as Session['user'];
    const isAdmin = user.isAdmin;
    const isSeller = user.isSeller;
    if (isAdmin) {

        const data = await getAllStatistics();
        return (
            <div className="toolkitAdmin">
                <main>
                    <ToolKitAdmin data={data} /> { }
                </main>
            </div>
        )
    }
    else if (isSeller) {
        return (
            <div className="toolkitSaller">
                <ToolKitSaller />
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
