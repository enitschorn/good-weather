import React from 'react';
import { array } from 'prop-types';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import ForecastListItem from './ForecastListItem';

const FORECASTS = gql`
  query Forecasts($dates: [String!]!) {
    forecasts(dates: $dates) {
      location {
        id
        name
      }
      date
      summary
      temperatureLow
      temperatureHigh
    }
  }
`;

export default function ForecastList({ dates }) {
  return (
    <Query
      query={FORECASTS}
      variables={{ dates: dates.map(({ date }) => date) }}
    >
      {(result) => {
        const { data, loading, error } = result;
        if (loading) return <p>Loading...</p>;
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
        return data.forecasts.map(
          ({
            location: { id, name },
            date,
            summary,
            temperatureLow,
            temperatureHigh,
          }) => (
            <ForecastListItem
              key={`${id}-${date}`}
              name={name}
              date={date}
              summary={summary}
              temperatureLow={temperatureLow}
              temperatureHigh={temperatureHigh}
            />
          ),
        );
      }}
    </Query>
  );
}

ForecastList.propTypes = {
  dates: array.isRequired,
};
