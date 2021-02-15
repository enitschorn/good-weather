import React, { useState } from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import ApolloClient from '../../api/ApolloClient';

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

export default function LocationList() {
  const [query, setQuery] = useState('');

  return (
    <ApolloProvider client={ApolloClient}>
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
          <Query
            query={LOCATION_LIST}
            variables={{ query }}
          >
            {
              ((result: any) => {
                const { loading, error, data } = result;

                if (loading) return 'loading ...';
                if (error) return `Error! ${query} ${error.message}`;

                return data.locations.map(
                  ({
                    id, name, latitude, longitude,
                  }) => (
                    <div key={id} className="row">
                      <div className="col-sm-3">{name}</div>
                      <div className="col-sm-3">{latitude}</div>
                      <div className="col-sm-6">{longitude}</div>
                    </div>
                  )
                );
              })
            }
          </Query>
        </div>
      </div>
    </ApolloProvider>
  );
}
