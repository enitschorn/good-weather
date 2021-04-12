import React, { useState, useEffect, FC } from 'react';
import ForecastMap from './ForecastMap';

interface SevenDayForecastProps {
  options: {
    googleApiKey: string;
    location: {
      latitude: Float32Array;
      longitude: Float32Array;
    };
  };
}

const locationData = [
  {
    name: 'Bairnsdale', lat: -37.853671, lng: 147.603693, highlight: false,
  },
  {
    name: 'Melbourne', lat: -37.814218, lng: 144.963161, highlight: false,
  },
  {
    name: 'Warragul', lat: -38.150476, lng: 145.93028, highlight: false,
  },
  {
    name: 'Warrnambool', lat: -38.382624, lng: 142.481419, highlight: false,
  },
];

const SevenDayForecast: FC<SevenDayForecastProps> = ({
  options: {
    googleApiKey,
    location: { latitude, longitude },
  },
}) => {
  const [time, setTime] = React.useState(0);
  const [lastTime, setLastTime] = React.useState(0);
  const [locations, setLocations] = useState(locationData);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  if (lastTime !== time) {
    const highlightLocation = locationData[time % locationData.length];
    // NOTE: adding removing locations does NOT reload the map
    // setLocations([highlightLocation]);
    setLocations(
      locationData.map((location) => ({
        ...location,
        highlight: location.name === highlightLocation.name,
      })),
    );
    setLastTime(time);
  }

  return (
    <ForecastMap
      googleApiKey={googleApiKey}
      latitude={latitude}
      longitude={longitude}
    >
      {locations.map(({
        lat, lng, name, highlight,
      }) => (
        <div
          key={name}
          className={`popover ${highlight === true && 'bg-success'}`}
          lat={lat}
          lng={lng}
          data-testid={`map-marker-${name}`}
        >
          <small>{name}</small>
        </div>
      ))}
    </ForecastMap>
  );
};

export default SevenDayForecast;
