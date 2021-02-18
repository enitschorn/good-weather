import React, { useState, FC } from "react";
import ForecastMap from "./ForecastMap";

interface SevenDayForecastProps {
  options: {
    googleApiKey: string;
    location: {
      latitude: Float32Array;
      longitude: Float32Array;
    };
  };
}

const SevenDayForecast: FC<SevenDayForecastProps> = ({
  options: {
    googleApiKey,
    location: { latitude, longitude },
  },
}) => {
  return (
    <ForecastMap
      googleApiKey={googleApiKey}
      latitude={latitude}
      longitude={longitude}
    >
      {/* this comves from an API without re-drawing the map? */}
      <div
        lat={-37.853671}
        lng={147.603693}
        data-testid="map-marker-bairnsdale"
      >
        <i class="fas fa-map-marker-alt" />
        Bairnsdale
      </div>
      <div lat={-37.814218} lng={144.963161} data-testid="map-marker-melbourne">
        <i class="fas fa-map-marker-alt" />
        Melbourne
      </div>
      <div lat={-38.150476} lng={145.93028} data-testid="map-marker-warragul">
        <i class="fas fa-map-marker-alt" />
        Warragul
      </div>
      <div
        lat={-38.382624}
        lng={142.481419}
        data-testid="map-marker-warrnambool"
      >
        <i class="fas fa-map-marker-alt" />
        Warrnambool
      </div>
    </ForecastMap>
  );
};

export default SevenDayForecast;
