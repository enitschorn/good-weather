module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :locations,
          resolver: Resolvers::Locations,
          description: "Find locations by location name"

    field :forecast_dates,
          resolver: Resolvers::ForecastDates,
          description: "Find forecast date"

    field :forecasts,
          resolver: Resolvers::Forecasts,
          description: "Find forecasts for a date range"
  end
end
