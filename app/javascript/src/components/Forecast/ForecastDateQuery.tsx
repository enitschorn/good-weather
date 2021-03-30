import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const FORECAST_DATES = gql`
  query ForecastDates {
    forecastDates {
      date
      displayDate
      isWeekend
    }
  }
`;

export const ForecastDateQuery = ({ setForecastDates }) => {
  const { loading, error, data } = useQuery(FORECAST_DATES);

  useEffect(() => {
    if (!loading && data) {
      setForecastDates(data.forecastDates);
    }
  }, [loading, data]);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{`Error! ${error.message}`}</p>;

  return <div />;
};
