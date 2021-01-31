class LocationForecast < ApplicationRecord
  belongs_to :location
  has_many :forecasts
end
