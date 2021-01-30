module Resolvers
  class Locations < Resolvers::BaseResolver
    argument :query, String, required: false

    type [Types::Location], null: false

    def resolve(query:)
      ::Location
        .where(
          Location
            .arel_table[:name]
            .matches("%#{query}%"),
        )
    end
  end
end
