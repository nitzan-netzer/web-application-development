import {myOrigin,apiStatisics} from '@/srcapi/constApi' 
import  {getSession}  from '@/srcapp/lib/session'

export async function getAllStatistics() 
{
    const session = await getSession();
    const token = session?.token;

    if (typeof token !== 'string')
    {
        throw new Error('Invalid token type'); // Handle the error accordingly
    }      
    try 
    {
        const url = `${myOrigin}${apiStatisics}`

        const response = await fetch(url, {            
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });

        if (!response.ok)
        {
            throw new Error(`Error fetching data: ${response.status}`);
        }

        // Parse the JSON data
        const data = await response.json()
        return data;
    }
    catch (error) 
    {
        console.error('Fetch error:', error);
    }
}