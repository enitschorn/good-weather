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
