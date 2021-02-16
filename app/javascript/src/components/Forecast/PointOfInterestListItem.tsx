import React, { FC } from 'react';

interface PointOfInterestListItemProps {
  id: string,
  name: string,
  address?: string,
  phone?: string,
  website?: string,
  email?: string,
  latitude?: string,
  longitude?: string,
  description?: string,
};

export const PointOfInterestListItem: FC<PointOfInterestListItemProps> = ({
  id,
  name,
  address,
  phone,
  website,
  email,
  latitude,
  longitude,
  description,
}) => {
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
