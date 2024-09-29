import axios from "axios";

export async function getLatLong(address) {
    const baseUrl = 'https://nominatim.openstreetmap.org/search';
    try {
        const response = await axios.get(baseUrl, {
            params: {
                q: address,
                format: 'json',
                addressdetails: 1,
                limit: 1
            }
        });

        if (response.data && response.data.length > 0) {
            const location = response.data[0];
            return {
                latitude: location.lat,
                longitude: location.lon
            };
        } else {
            throw new Error('No results found for the given address.');
        }

    } catch (error) {
        console.error(`HTTP Error: ${error.message}`);
        throw error;
    }
}
