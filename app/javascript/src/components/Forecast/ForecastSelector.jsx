import React from 'react';
import { func } from 'prop-types';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import ForecastSelectorDate from './ForecastSelectorDate';

const FORECAST_DATES = gql`
  query ForecastDates {
    forecastDates {
      date
    }
  }
`;

export default function ForecastSelector({ dateSelected, toggleDate }) {
  return (
    <Query query={FORECAST_DATES}>
      {({ loading, error, data }) => {
        if (loading) return 'loading ...';
        if (error) return `Error! ${error.message}`;
        return (
          <div className="row">
            <div className="col-sm-2" />
            <div className="col-sm-8">
              {data.forecastDates.map(({ date }) => (
                <ForecastSelectorDate
                  key={date}
                  dateSelected={dateSelected}
                  toggleDate={toggleDate}
                  date={date}
                />
              ))}
            </div>
          </div>
        );
      }}
    </Query>
  );
}

ForecastSelector.propTypes = {
  dateSelected: func.isRequired,
  toggleDate: func.isRequired,
};
