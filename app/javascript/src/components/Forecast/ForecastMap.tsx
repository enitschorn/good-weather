import React, { useState, FC } from 'react';
import {
  Popover, PopoverBody, PopoverHeader,
} from 'reactstrap';
import GoogleMapReact from 'google-map-react';
import { ForecastIcon } from './ForecastIcon';

interface Forecasts {
  location: {
    id: string,
    name: string,
    latitude: Float32Array,
    longitude: Float32Array,
  },
  id: string,
  date: string,
  summary: string,
  temperatureLow: string,
  temperatureHigh: string,
  icon: string,
}
interface ForecastMapProps {
  mapKey: string,
  forecasts: Forecasts[],
}
interface LocationMarkerProps {
  id: string,
  name: string,
  summary: string,
  lat: Float32Array,
  lng: Float32Array,
  icon: string,
  temperatureHigh: string,
}

const LocationMarker: FC<LocationMarkerProps> = ({
  // eslint-disable-next-line no-unused-vars
  id, name, summary, icon, temperatureHigh, lat, lng,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  const temperature = Math.round(Number(temperatureHigh));

  return (
    <div>
      <ForecastIcon name={icon} id={`showLocationMarker${id}`} />
      <Popover placement="right" isOpen={popoverOpen} target={`showLocationMarker${id}`} toggle={togglePopover}>
        <PopoverHeader>{name}</PopoverHeader>
        <PopoverBody>
          <h4>
            {temperature}
            °C
          </h4>
          <div>{summary}</div>
        </PopoverBody>
      </Popover>
    </div>
  );
};

export const ForecastMap: FC<ForecastMapProps> = ({ mapKey, forecasts }) => {
  const defaultProps = {
    center: {
      lat: -37.803,
      lng: 144.98,
    },
    zoom: 7,
  };

  if (forecasts.length === 0) {
    return (
      <div className="row">
        <div className="col">
          <div>select dates above ...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: mapKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {forecasts.map(({
          id: key, summary, icon, temperatureHigh, location: {
            id, latitude, longitude, name,
          },
        }) => (
          <LocationMarker
            key={key}
            id={id}
            name={name}
            summary={summary}
            lat={latitude}
            lng={longitude}
            icon={icon}
            temperatureHigh={temperatureHigh}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};
