import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { kthLocations } from '../../utils/locations';

const LocationPicker = ({ location, onLocationSelect }) => {
  const kathmandu = { lat: 27.7172, lng: 85.3240 };
  
  return (
    <div className="relative h-[300px] rounded-lg overflow-hidden">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          zoom={13}
          center={location?.coords || kathmandu}
          onClick={(e) => onLocationSelect({
            name: 'custom',
            coords: { lat: e.latLng.lat(), lng: e.latLng.lng() }
          })}
        >
          {/* Show predefined locations */}
          {kthLocations.map(loc => (
            <Marker
              key={loc.id}
              position={loc.coords}
              title={loc.name}
              icon={{
                url: '/marker.png',
                scaledSize: { width: 30, height: 30 }
              }}
            />
          ))}
          
          {/* Show selected location */}
          {location?.coords && (
            <Marker
              position={location.coords}
              icon={{
                url: '/selected-marker.png',
                scaledSize: { width: 35, height: 35 }
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LocationPicker;