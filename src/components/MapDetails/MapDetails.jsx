import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import customMapStyle from '../../utils/mapStyle';
import { HOUSE_INITIAL_COORDS } from '../../consts/house.consts';

const center = HOUSE_INITIAL_COORDS;

function Map({ houseData, zoom }) {
  const [centerMap, setCenterMap] = useState(center);

  if (houseData.length <= 1 && centerMap !== houseData[0].location.coordinates) {
    setCenterMap(houseData[0].location.coordinates);
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });
  if (!isLoaded) {
    return 'Loading';
  }

  return houseData[0].location.coordinates ? (
    <GoogleMap
      zoom={zoom}
      center={centerMap}
      mapContainerStyle={{ width: '100%', height: '40vh' }}
      options={{ styles: customMapStyle }}>
      {houseData.map(({ location }, idx) => {
        return (
          <Marker
            key={idx}
            position={location.coordinates}
            icon={{
              url: 'https://res.cloudinary.com/dbtmrinwa/image/upload/v1694019495/qgvcwulxj6zt5jvy79su.png',
              scaledSize: new window.google.maps.Size(43, 70)
            }}></Marker>
        );
      })}
    </GoogleMap>
  ) : (
    'cargando'
  );
}
export default Map;
