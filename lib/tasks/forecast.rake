desc "Print forecast for a given lat long"
# eg for Melbourne Australia
#   bin/rails forecast[-37.81,144.96]
task :forecast, %i[lat long] => :environment do |_task, args|
  forecast = Darksky::Forecast.fetch(lat: args[:lat], long: args[:long])
  puts forecast.weather_summary
end
