import React, { useEffect } from 'react';
import { bool, func, string } from 'prop-types';

export default function ForecastSelectorDate({
  dateSelected,
  toggleDate,
  date,
  displayDate,
  isWeekend,
}) {
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

ForecastSelectorDate.propTypes = {
  dateSelected: func.isRequired,
  toggleDate: func.isRequired,
  date: string.isRequired,
  displayDate: string.isRequired,
  isWeekend: bool.isRequired,
};
