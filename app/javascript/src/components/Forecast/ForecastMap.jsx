import React, { useState } from 'react';
import { array, string } from 'prop-types';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Tooltip } from 'reactstrap';

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
    }
  }
`;

const PoiMarker = ({ id, name }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleMenuToolTip = () => {
    setTooltipOpen(!tooltipOpen);
  };
  return (
    <div>
      <i className="fas fa-map-marker-alt" style={{ fontSize: '1.7em', color: 'green' }} id={`showPoiMarker${id}`} />
      <Tooltip placement="right" isOpen={tooltipOpen} target={`showPoiMarker${id}`} toggle={toggleMenuToolTip}>
        {name}
      </Tooltip>
    </div>
  );
};

PoiMarker.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
};

const LocationMarker = ({ id, name, summary }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleMenuToolTip = () => {
    setTooltipOpen(!tooltipOpen);
  };
  return (
    <div>
      <i className="fas fa-cloud-sun" style={{ fontSize: '2em', color: 'amber' }} id={`showLocationMarker${id}`} />
      <Tooltip placement="right" isOpen={tooltipOpen} target={`showLocationMarker${id}`} toggle={toggleMenuToolTip}>
        {name}
        {' '}
        -
        {summary}
      </Tooltip>
    </div>
  );
};

LocationMarker.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  summary: string.isRequired,
};

export default function ForecastMap({ dates, mapKey, pois }) {
  const defaultProps = {
    center: {
      lat: -37.803,
      lng: 144.98,
    },
    zoom: 7,
  };

  return (
    <Query
      query={FORECASTS}
      variables={{ dates: dates.map(({ date }) => date) }}
    >
      {({ loading, error, data }) => {
        if (loading) return 'loading ...';
        if (error) return `Error! ${dates} ${error.message}`;
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
                id: key, summary, location: {
                  id, latitude, longitude, name,
                },
              }) => (
                <LocationMarker
                  key={key}
                  id={id}
                  name={name}
                  lat={latitude}
                  lng={longitude}
                  summary={summary}
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
      }}
    </Query>
  );
}

ForecastMap.propTypes = {
  dates: array.isRequired,
  mapKey: string.isRequired,
  pois: array.isRequired,
};
