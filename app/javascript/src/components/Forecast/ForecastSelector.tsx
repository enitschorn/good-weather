import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import  gql  from 'graphql-tag';

import { ForecastSelectorDate } from './ForecastSelectorDate';

const FORECAST_DATES = gql`
  query ForecastDates {
    forecastDates {
      date
      displayDate
      isWeekend
    }
  }
`;

interface ForecastSelectorProps {
  dateSelected: (date: any) => boolean,
  toggleDate: (date: any) => void,
}

export const ForecastSelector: FC<ForecastSelectorProps> = ({ dateSelected, toggleDate }) => {
  const { loading, error, data } = useQuery(FORECAST_DATES)

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
}
