import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const LOCATION_LIST = gql`
  query Locations($query: String!) {
    locations(query: $query) {
      id
      name
      latitude
      longitude
    }
  }
`;

export const LocationList = () => {
  const [query, setQuery] = useState('');
  const { loading, error, data } = useQuery(LOCATION_LIST, {
    variables: query,
  })

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{`Error! ${query} ${error.message}`}</p>;

  return (
    <>
      <div className="row">
        <div className="col-sm-2" />
        <div className="col-sm-8">
          <form>
            <input
              className="form-control"
              placeholder="Type your location query ..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-1" />
        <div className="col-sm-10">
            {
              data.locations.map(
                ({
                  id, name, latitude, longitude,
                }) => (
                  <div key={id} className="row">
                    <div className="col-sm-3">{name}</div>
                    <div className="col-sm-3">{latitude}</div>
                    <div className="col-sm-6">{longitude}</div>
                  </div>
                )
              )
            }
        </div>
      </div>
    </>
  );
}
