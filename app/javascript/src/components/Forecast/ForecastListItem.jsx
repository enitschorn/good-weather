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
    <div className="row">
      <div className="col-sm-2" />
      <div className="col-sm-2">{name}</div>
      <div className="col-sm-2">{date}</div>
      <div className="col-sm-2">{summary}</div>
      <div className="col-sm-2 text-right">{`${temperatureLow} - ${temperatureHigh}`}</div>
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
