import React, { useState } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from '../../api/ApolloClient';

import ForecastList from './ForecastList';
import ForecastSelector from './ForecastSelector';

export default function Forecast() {
  const [dates, setDates] = useState([]);

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
        <div className="col-sm-1" />
        <div className="col-sm-10">
          <ForecastSelector
            dateSelected={dateSelected}
            toggleDate={toggleDate}
          />
          <ForecastList dates={dates} />
        </div>
      </div>
    </ApolloProvider>
  );
}
