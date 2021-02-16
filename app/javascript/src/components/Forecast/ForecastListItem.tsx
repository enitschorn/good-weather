import React, { FC } from 'react';

interface ForecastListItemProps {
  name: string,
  date: string,
  summary: string,
  temperatureLow: number,
  temperatureHigh: number,
}

export const ForecastListItem: FC<ForecastListItemProps> = ({
  name,
  date,
  summary,
  temperatureLow,
  temperatureHigh,
}) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <div>{date}</div>
      <div>{summary}</div>
      <div>{`${temperatureLow} - ${temperatureHigh}`}</div>
    </div>
  );
}
