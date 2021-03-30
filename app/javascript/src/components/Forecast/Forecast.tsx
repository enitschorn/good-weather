import React, { FC, useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';

import { PointOfInterestList } from './PointOfInterestList';
import { ForecastMap } from './ForecastMap';
import { ForecastSelector } from './ForecastSelector';
import { ForecastQuery } from './ForecastQuery';
import { ForecastDateQuery } from './ForecastDateQuery';

import ApolloClient from '../../api/ApolloClient';

interface ForecastProps {
  options: {
    googleApiKey: string,
  },
}

export const Forecast: FC<ForecastProps> = ({ options: { googleApiKey } }) => {
  const [dates, setDates] = useState([]);
  const [pois, setPois] = useState([]);
  const [mapOnly, setMapOnly] = useState(true);
  const [forecasts, setForecasts] = useState([]);
  const [forecastDates, setForecastDates] = useState([]);
  const [time, setTime] = useState(0);
  const [lastTime, setLastTime] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  if (lastTime !== time) {
    if (forecastDates) {
      setDates([forecastDates[time % forecastDates.length]]);
    }
    setLastTime(time);
  }

  const dateSelected = (date) => dates.filter((fDate) => fDate.date === date).length !== 0;
  const toggleDate = (date) => {
    if (dateSelected(date)) {
      setDates(dates.filter((selectedDate) => selectedDate.date !== date));
    } else {
      setDates([...dates, { date }]);
    }
  };

  return (
    <ApolloProvider client={ApolloClient}>
      <div className="row">
        <div className="col">
          <ForecastSelector
            dateSelected={dateSelected}
            toggleDate={toggleDate}
            forecastDates={forecastDates}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button
            type="button"
            className={`btn btn${mapOnly ? '' : '-outline'}-info float-right`}
            onClick={() => setMapOnly(true)}
          >
            <i className="fas fa-map" />
          </button>
          <button
            type="button"
            className={`btn btn${mapOnly ? '-outline' : ''}-info float-right`}
            onClick={() => setMapOnly(false)}
          >
            <i className="fas fa-list" />
          </button>
        </div>
      </div>
      <div className="row">
        {mapOnly ? (
          <div className="col">
            <ForecastMap mapKey={googleApiKey} forecasts={forecasts} />
          </div>
        ) : (
          <>
            <div className="col-sm-6">
              <PointOfInterestList dates={dates} setPois={setPois} />
            </div>
            <div className="col-sm-6">
              <ForecastMap mapKey={googleApiKey} forecasts={forecasts} />
            </div>
          </>
        )}
      </div>
      <ForecastDateQuery setForecastDates={setForecastDates} />
      <ForecastQuery setForecasts={setForecasts} dates={dates} />
    </ApolloProvider>
  );
};
