import React, { useEffect, FC } from 'react';

interface ForecastSelectorDateProps {
  dateSelected: (date: any) => boolean,
  toggleDate: (date: any) => void,
  date: string,
  displayDate: string,
  isWeekend: boolean,
}

export const ForecastSelectorDate: FC<ForecastSelectorDateProps> = ({
  dateSelected,
  toggleDate,
  date,
  displayDate,
  isWeekend,
}) => {
  useEffect(() => {
    if (isWeekend) toggleDate(date);
  }, []);

  return (
    <button
      type="button"
      className={`btn btn${dateSelected(date) ? '' : '-outline'}${isWeekend ? '-warning' : '-secondary'} mr-1`}
      onClick={() => toggleDate(date)}
    >
      {displayDate}
      <i
        className={`ml-2 fas ${dateSelected(date) ? 'fa-times' : 'fa-plus'}`}
      />
    </button>
  );
}
