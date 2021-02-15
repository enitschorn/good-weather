import React from 'react';
import { array, string } from 'prop-types';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

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
      date
      summary
      temperatureLow
      temperatureHigh
    }
  }
`;

const AnyReactComponent = ({ text }) => <div className="card">{text}</div>;

AnyReactComponent.propTypes = {
  text: string.isRequired,
  lat: string,
  lng: string,
};

ForecastMap.propTypes = {
  dates: array.isRequired,
  mapKey: string.isRequired,
};

export default function ForecastMap({ dates, mapKey }) {
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
      {(result) => {
        const { data, loading, error } = result;
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
        return data.forecasts.map(
          ({
              id,
              location: { latitude, longitude, name },
            }) => (
              <div style={{ height: '100vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: mapKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                <AnyReactComponent key={id} text={name} lat={latitude} lng={longitude} />
                </GoogleMapReact>
            </div>
          ),
        );
      }}
    </Query>
  );
}
