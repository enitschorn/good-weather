import React from 'react';
import { func } from 'prop-types';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import ForecastSelectorDate from './ForecastSelectorDate';

const FORECAST_DATES = gql`
  query ForecastDates {
    forecastDates {
      date
      displayDate
      isWeekend
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
          <div className="container my-2">
            <div className="row">
              <div className="col">
                {data.forecastDates.map(({ date, displayDate, isWeekend }) => (
                  <ForecastSelectorDate
                    key={date}
                    dateSelected={dateSelected}
                    toggleDate={toggleDate}
                    date={date}
                    displayDate={displayDate}
                    isWeekend={isWeekend}
                  />
                ))}
              </div>
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
