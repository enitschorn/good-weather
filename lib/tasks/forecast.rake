desc "Print forecast for a given lat long"
# eg for Melbourne Australia
#   bin/rails forecast[-37.81,144.96]
task :forecast, %i[lat long] => :environment do |_task, args|
  forecast = Darksky::Forecast.fetch(lat: args[:lat], long: args[:long])
  puts forecast.weather_summary
end

desc "Print forecast for a number of cities"
# eg for Melbourne Australia
#   bin/rails forecasts_by_city CITIES="Melbourne,Warnambool,Bairsdale,Albury"
task forecasts_by_city: :environment do
  output = []
  ENV["CITIES"].split(",").each do |city|
    city_location = LocationIq::Search.fetch(query: city)
    city_forecast = Darksky::Forecast.fetch(
      lat: city_location.lat, long: city_location.long,
    )
    output << ""
    output << city
    output << Array.new(30, "-").join
    output << city_forecast.weather_summary
  end
  puts output
end

namespace :location do
  desc "Enrich locations with latitude and longitude if 0/0"
  # bin/rails location:enrich_lat_lng
  task enrich_lat_lng: :environment do
    Location
      .where(latitude: 0, longitude: 0)
      .each do |location|
        location_iq = LocationIq::Search.fetch(query: location.name)
        next unless location_iq

        location.update!(
          latitude: location_iq.latitude,
          longitude: location_iq.longitude,
        )
      end
  end
end

namespace :forecast do
  desc "fetch forecast for all locations"
  # run to fetch forecast for all locations
  #   bin/rails forecast:locations
  task locations: :environment do
    Location
      .where(
        Location.arel_table[:latitude].eq(0).not
        .or(
          Location.arel_table[:longitude].eq(0).not,
        ),
      )
      .where(is_fetching_forecast: true)
      .each do |location|
        darksky_location_forecast = Darksky::Forecast.fetch(
          lat: location.latitude, long: location.longitude,
        )
        darksky_location_forecast.raw_response["daily"]["data"].map do |h|
          [Time.at(h["time"]).to_date, h["temperatureLow"], h["temperatureHigh"], h["summary"]]
        end
        fetch_time = Time.at(
          darksky_location_forecast
            .raw_response
            .dig("currently", "time"),
        )
        fetch_timezone = darksky_location_forecast
                         .raw_response
                         .dig("currently", "timezone")
        fetch_time.in_time_zone(fetch_timezone)
        darksky_location_forecast
          .raw_response.dig("daily", "data")
          .each do |daily_data|
            forecast_date = Time.at(daily_data["time"]).to_date
            location_forecast = location
                                .location_forecasts
                                .find_or_create_by(date: forecast_date)
            hourly_data = darksky_location_forecast
                          .raw_response
                          .dig("hourly", "data")
                          .filter { |times| Time.at(times["time"]).to_date == forecast_date }
            location_forecast
              .forecasts
              .create!(
                date: forecast_date,
                temperature_low: daily_data["temperatureLow"],
                temperature_high: daily_data["temperatureHigh"],
                summary: daily_data["summary"],
                daily_data: daily_data,
                hourly_data: hourly_data,
              )
          end
      end
  end
end
