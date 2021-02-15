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
      {
        ((result) => {
          const { loading, error, data } = result;
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{`Error! ${error.message}`}</p>;
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
        })
      }
    </Query>
  );
}

ForecastSelector.propTypes = {
  dateSelected: func.isRequired,
  toggleDate: func.isRequired,
};
