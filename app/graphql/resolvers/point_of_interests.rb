module Resolvers
  class PointOfInterests < Resolvers::BaseResolver
    # argument :query, [String], required: false

    type [Types::PointOfInterest], null: false

    def resolve
      ::PointOfInterest
        .all
    end
  end
end
