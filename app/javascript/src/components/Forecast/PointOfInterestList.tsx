import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import { PointOfInterestListItem } from './PointOfInterestListItem';

const FORECASTS = gql`
  query PointOfInterests {
    pointOfInterests {
      id
      name
      address
      phone
      website
      email
      latitude
      longitude
      description
      featureImageUrls{
        url
      }
    }
  }
`;

interface PointOfInterestListProps {
  dates: Date[],
  setPois: any,
}

interface Date {
  date: string
}

export const PointOfInterestList: FC<PointOfInterestListProps> = ({ dates, setPois }) => {
  const { loading, error, data } = useQuery(FORECASTS, {
    variables: { dates: dates.map(({ date }) => date) },
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{`Error! ${dates} ${error.message}`}</p>;

  setPois(data.pointOfInterests);

  if (data.pointOfInterests.length === 0) {
    return (
      <div className="row">
        <div className="col">
          <div>There are no points of interest in your region ...</div>
        </div>
      </div>
    );
  }

  return (
    data.pointOfInterests.map(
      ({
        id,
        name,
        address,
        phone,
        website,
        email,
        latitude,
        longitude,
        description,
        featureImageUrls,
      }) => (
        <PointOfInterestListItem
          key={id}
          id={id}
          name={name}
          address={address}
          phone={phone}
          website={website}
          email={email}
          latitude={latitude}
          longitude={longitude}
          description={description}
          featureImageUrls={featureImageUrls}
        />
      ),
    )
  );
};
