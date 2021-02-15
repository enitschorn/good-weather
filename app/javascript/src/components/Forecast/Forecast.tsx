import React, { FC, useState } from 'react';
import { ApolloProvider } from '@apollo/client';

import { PointOfInterestList } from './PointOfInterestList';
import { ForecastMap } from './ForecastMap';
import { ForecastSelector } from './ForecastSelector';

import ApolloClient from '../../api/ApolloClient'

interface ForecastProps {
  options: Key,
}

interface Key {
  googleApiKey: string,
}

export const Forecast: FC<ForecastProps> = ({ options: { googleApiKey } }) => {
  const [dates, setDates] = useState([]);
  const [pois, setPois] = useState([]);

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
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <PointOfInterestList dates={dates} setPois={setPois} />
        </div>
        <div className="col-sm-6">
          <ForecastMap dates={dates} mapKey={googleApiKey} pois={pois} />
        </div>
      </div>
    </ApolloProvider>
  );
}
