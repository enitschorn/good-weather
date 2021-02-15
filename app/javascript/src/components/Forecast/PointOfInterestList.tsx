import React from 'react';
import { array, func } from 'prop-types';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import PointOfInterestListItem from './PointOfInterestListItem';

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
    }
  }
`;

export default function PointOfInterestList({ dates, setPois }) {
  return (
    <Query
      query={FORECASTS}
      variables={{ dates: dates.map(({ date }) => date) }}
    >
      {({ loading, error, data }) => {
        if (loading) return 'loading ...';
        if (error) return `Error! ${dates} ${error.message}`;
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
        return data.pointOfInterests.map(
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
            />
          ),
        );
      }}
    </Query>
  );
}

PointOfInterestList.propTypes = {
  dates: array.isRequired,
  setPois: func.isRequired,
};
