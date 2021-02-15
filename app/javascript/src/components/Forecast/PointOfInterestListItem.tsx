import React from 'react';
import { string } from 'prop-types';

export default function ForecastListItem({
  id,
  name,
  address,
  phone,
  website,
  email,
  latitude,
  longitude,
  description,
}) {
  return (
    <div id={id} className="card">
      <h3>{name}</h3>
      <p>{address}</p>
      <p>{phone}</p>
      <p>{website}</p>
      <p>{email}</p>
      <p>{description}</p>
      <p>
        {latitude}
        {' '}
        -
        {' '}
        {longitude}
      </p>
    </div>
  );
}

ForecastListItem.defaultProps = {
  address: undefined,
  phone: undefined,
  website: undefined,
  email: undefined,
  latitude: undefined,
  longitude: undefined,
  description: undefined,
};

ForecastListItem.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  address: string,
  phone: string,
  website: string,
  email: string,
  latitude: string,
  longitude: string,
  description: string,
};
