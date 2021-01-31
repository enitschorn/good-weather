import React from 'react';
import { func, string } from 'prop-types';

export default function ForecastSelectorDate({
  dateSelected,
  toggleDate,
  date,
}) {
  return (
    <div>
      <button
        type="button"
        className={`btn ${
          dateSelected(date) ? 'btn-secondary' : 'btn-outline-secondary'
        }`}
        onClick={() => toggleDate(date)}
      >
        {date}
        <i
          className={`ml-2 fas ${dateSelected(date) ? 'fa-times' : 'fa-plus'}`}
        />
      </button>
    </div>
  );
}

ForecastSelectorDate.propTypes = {
  dateSelected: func.isRequired,
  toggleDate: func.isRequired,
  date: string.isRequired,
};
