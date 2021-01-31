module Resolvers
  class ForecastDates < Resolvers::BaseResolver
    type [Types::ForecastDate], null: false

    def resolve
      ::LocationForecast
        .all
        .group(:date)
        .count
        .keys
        .sort
        .map { |date| { date: date } }
    end
  end
end
