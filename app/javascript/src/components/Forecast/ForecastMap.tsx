import React, { useState, FC } from 'react';
import { useQuery } from '@apollo/client';
import  gql  from 'graphql-tag';
import { Tooltip } from 'reactstrap';
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
};

interface ForecastMapProps {
  dates: Date[],
  mapKey: string,
  pois: PointsOfInterestProps[],
};

interface Date {
  date: string,
}

interface PointsOfInterestProps {
  id: string,
  name: string,
  address?: string,
  phone?: string,
  website?: string,
  email?: string,
  lat: string,
  lng: string,
  description?: string,
  status?: number,
  latitude?: string,
  longitude?: string,
}


const PoiMarker: FC<PoiMarkerProps> = ({ id, name, lat, lng }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleMenuToolTip = () => {
    setTooltipOpen(!tooltipOpen);
  };
  return (
    <div>
      <i className="fas fa-map-marker-alt" style={{ fontSize: '2.5em', color: '#800064' }} id={`showPoiMarker${id}`} />
      <Tooltip placement="right" isOpen={tooltipOpen} target={`showPoiMarker${id}`} toggle={toggleMenuToolTip}>
        {name}
      </Tooltip>
    </div>
  );
};

const LocationMarker: FC<LocationMarkerProps> = ({ id, name, summary, icon, lat, lng }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleMenuToolTip = () => {
    setTooltipOpen(!tooltipOpen);
  };

  return (
    <div>
      <ForecastIcon name={icon} id={`showLocationMarker${id}`} />
      <Tooltip placement="right" isOpen={tooltipOpen} target={`showLocationMarker${id}`} toggle={toggleMenuToolTip}>
        {name}
        {' '}
        -
        {summary}
      </Tooltip>
    </div>
  );
};

export const ForecastMap: FC<ForecastMapProps> = ({ dates, pois, mapKey }) => {
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
          id: key, summary, icon, location: {
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
          />
        ))}
        {pois.map(({
          id, name, latitude, longitude,
        }) => (
          <PoiMarker
            key={`poi-${id}`}
            name={name}
            id={id}
            lat={latitude}
            lng={longitude}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
