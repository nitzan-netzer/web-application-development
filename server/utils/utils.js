import axios from "axios";
const GOOGLE_API_KEY = 'AIzaSyBBcTb91luOZMDrkG7a_La0POwCFSc45zo';

export async function getLatLong(address){
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            return { lat: location.lat, lng: location.lng };
        } else {
            console.log('Geocoding API error:', data.status);
        }
    } catch (error) {
        console.error('Error fetching data from Geocoding API:', error);
    }
}
