import React, { useState, FC } from 'react';
import { useQuery } from '@apollo/client';
import  gql  from 'graphql-tag';
import { Tooltip, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { ForecastIcon } from './ForecastIcon'

import GoogleMapReact from 'google-map-react';

const FORECASTS = gql`
  query Forecasts($dates: [String!]!) {
    forecasts(dates: $dates) {
      location {
        id
        name
        latitude
        longitude
      }
      id
      date
      summary
      temperatureLow
      temperatureHigh
      icon
    }
  }
`;

interface PoiMarkerProps {
  id: string,
  name: string,
  lat: string,
  lng: string,
};

interface LocationMarkerProps {
  id: string,
  name: string,
  summary: string,
  lat: string,
  lng: string,
  icon: string,
  temperatureHigh: string,
};

interface ForecastMapProps {
  dates: Date[],
  mapKey: string,
};

interface Date {
  date: string,
}


const LocationMarker: FC<LocationMarkerProps> = ({ id, name, summary, icon, temperatureHigh, lat, lng }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  const temperature = Math.round(Number(temperatureHigh))

  return (
    <div>
      <ForecastIcon name={icon} id={`showLocationMarker${id}`} />
      <Popover placement="right" isOpen={popoverOpen} target={`showLocationMarker${id}`} toggle={togglePopover}>
        <PopoverHeader>{name}</PopoverHeader>
        <PopoverBody>
          <h4>{temperature}°C</h4>
          <div>{summary}</div>
        </PopoverBody>
      </Popover>
    </div>
  );
};

export const ForecastMap: FC<ForecastMapProps> = ({ dates, mapKey }) => {
  const {loading, error, data} = useQuery(FORECASTS, {
    variables: { dates: dates.map(({ date }) => date) }
  })
  const defaultProps = {
    center: {
      lat: -37.803,
      lng: 144.98,
    },
    zoom: 7,
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{`Error! ${dates} ${error.message}`}</p>;


  if (data.forecasts.length === 0) {
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
        {data.forecasts.map(({
          id: key, summary, icon, temperatureHigh, location: {
            id, latitude, longitude, name
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
}
