module Resolvers
  class Forecasts < Resolvers::BaseResolver
    argument :dates, [String], required: true

    type [Types::Forecast], null: false

    def resolve(dates)
      ::LocationForecast
        .includes(:location, :forecasts)
        .where(date: dates[:dates])
        .order("forecasts.created_at DESC")
        .map do |lf|
          {
            location: lf.location,
          }.merge(lf.forecasts.first.attributes)
        end
    end
  end
end
