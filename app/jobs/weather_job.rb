class WeatherJob < ApplicationJob
  include Sidekiq::Worker
  queue_as :default
  def perform(*args)
    puts 'This is where we will do the WeatherApi calls.'
    sleep 3
    puts 'This is done.'
  end
end
