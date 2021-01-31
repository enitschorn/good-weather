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
      {({ loading, error, data }) => {
        if (loading) return 'loading ...';
        if (error) return `Error! ${dates} ${error.message}`;
        if (data.forecasts.length === 0) {
          return (
            <div className="row">
              <div className="col-sm-2" />
              <div className="col-sm-2">
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
