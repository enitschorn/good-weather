import React, { FC } from 'react';
import { ForecastIcon } from './ForecastIcon';

interface ForecastListItemProps {
  name: string,
  date: string,
  summary: string,
  temperatureLow: number,
  temperatureHigh: number,
  icon: string,
}

export const ForecastListItem: FC<ForecastListItemProps> = ({
  name,
  date,
  summary,
  temperatureLow,
  temperatureHigh,
  icon,
}) => (
  <div className="card">
    <h3>{name}</h3>
    <div>{date}</div>
    <div>{summary}</div>
    <ForecastIcon name={icon} />
    <div>{`${temperatureLow} - ${temperatureHigh}`}</div>
  </div>
);
