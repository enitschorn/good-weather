import React from 'react';
import { string, number } from 'prop-types';

export default function ForecastListItem({
  name,
  date,
  summary,
  temperatureLow,
  temperatureHigh,
}) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <div>{date}</div>
      <div>{summary}</div>
      <div>{`${temperatureLow} - ${temperatureHigh}`}</div>
    </div>
  );
}

ForecastListItem.propTypes = {
  name: string.isRequired,
  date: string.isRequired,
  summary: string.isRequired,
  temperatureLow: number.isRequired,
  temperatureHigh: number.isRequired,
};
