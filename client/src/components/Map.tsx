'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for missing marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

interface MapProps {
  locations: Location[];
}

const MapComponent: React.FC<MapProps> = ({ locations }) => {
  const center = {
    lat: locations[0]?.latitude || 0,
    lng: locations[0]?.longitude || 0,
  };

  const MapAutoZoom = () => {
    const map = useMap();

    useEffect(() => {
      if (locations.length > 1) {
        const bounds = L.latLngBounds(locations.map(loc => [loc.latitude, loc.longitude]));
        map.fitBounds(bounds); // Automatically adjust zoom and center to fit all markers
      } else {
        map.setView([center.lat, center.lng], 13); // Fallback for single location
      }
    }, [locations, map]);

    return null;
  };

  return (
    <MapContainer center={[center.lat, center.lng]} zoom={13} style={{ width: '100%', height: '400px' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapAutoZoom />
      {locations.map((location, index) => (
        <Marker key={index} position={[location.latitude, location.longitude]}>
          <Popup>
            {location.address} <br /> Latitude: {location.latitude}, Longitude: {location.longitude}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
