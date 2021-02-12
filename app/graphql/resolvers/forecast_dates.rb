module Resolvers
  class ForecastDates < Resolvers::BaseResolver
    type [Types::ForecastDate], null: false

    def resolve
      ::LocationForecast
        .where(::LocationForecast.arel_table[:date].gteq(Date.today))
        .group(:date)
        .count
        .keys
        .sort
        .map do |date|
          {
            date: date,
            display_date: date.strftime("%a %d"),
            is_weekend: date.saturday? || date.sunday?,
          }
        end
    end
  end
end
