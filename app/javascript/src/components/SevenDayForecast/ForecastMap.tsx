import React, { FC } from 'react';
import GoogleMapReact from 'google-map-react';

interface ForecastMapProps {
  googleApiKey: string;
  latitude: Float32Array;
  longitude: Float32Array;
  children: NodeList;
}

const ForecastMap: FC<ForecastMapProps> = ({
  googleApiKey,
  latitude,
  longitude,
  children,
}) => {
  const defaultProps = {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 7,
  };

  return (
    <div style={{ height: '70vh', width: '100%' }} data-testid="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleApiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {children}
      </GoogleMapReact>
    </div>
  );
};

export default ForecastMap;
