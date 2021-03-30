import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import  gql  from 'graphql-tag';

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



export const ForecastQuery = ({ dates, setForecasts }) => {
    const {loading, error, data} = useQuery(FORECASTS, {
        variables: { dates: dates.map(({ date }) => date) }
    })

    useEffect(() => {
        if(!loading && data){
          setForecasts(data.forecasts);
        }
    }, [loading, data])

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{`Error! ${dates} ${error.message}`}</p>;  

    return <div />
}
