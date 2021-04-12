import React, { FC } from 'react';
import { ForecastSelectorDate } from './ForecastSelectorDate';

interface ForecastDate {
  date: string,
  displayDate: string,
  isWeekend: boolean,
}

interface ForecastSelectorProps {
  dateSelected: (date: any) => boolean,
  toggleDate: (date: any) => void,
  forecastDates: ForecastDate[],
}

export const ForecastSelector: FC<ForecastSelectorProps> = (
  { dateSelected, toggleDate, forecastDates },
) => (
  <div className="container my-2">
    <div className="row">
      <div className="col">
        {forecastDates.map(({ date, displayDate, isWeekend }) => (
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
